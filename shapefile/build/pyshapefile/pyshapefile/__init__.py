# Copyright (c) 2008
#   Zach Steindler (steiza@gmail.com, http://code.google.com/p/pyshapefile/)
#
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without modification,
# are permitted provided that the following conditions are met:
#
# Redistributions of source code must retain the above copyright notice,
# this list of conditions and the following disclaimer.
#
# Redistributions in binary form must reproduce the above copyright notice,
# this list of conditions and the following disclaimer in the documentation
# and/or other materials provided with the distribution.
#
# Neither the name of the original author nor the names of contributors
# may be used to endorse or promote products derived from this software
# without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
# AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
# IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
# ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
# LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
# DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
# SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
# CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
# OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
# OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


import struct

__version__ = "0.1"
__author__ = "Zach Steindler <steiza@gmail.com>"

_POINT_PAIR_SIZE = 16


class ShapefileData(object):
    """A python class for loading and visualizing GPS shapefiles.

    This library is designed to work with large data sets, where you might not
    want to load all information at once. A typical usage might look something
    like this:

        shp = ShapefileData('path/to/your_shapefile_name_without_extension')

        shp.load_objects()
        shp.dbf_load_objects()

        shp.view_data()

    After calling this methods, you can access data like this:

        for each in shp.items.itervalues():
            if item['type'] == 'polyline':
                print each['points']

            print each[<dbf field name>]
    """

    def __init__(self, base_filename):
        """Initializes ShapefileData with path to shapefile data.

        Args:
            base_filename: Base path to shapefile data. base_filename + '.shp'
              and base_filename + '.dbf' should exist.
        """
        self.base_filename = base_filename


    def load_bounding_box(self):
        """Loads boundry information from .shp file"""
        shp_fd = open('%s.shp' % self.base_filename, 'rb')
        shp_fd.seek(36)

        self.file_xmin, self.file_ymin, self.file_xmax, self.file_ymax = \
                struct.unpack('dddd', shp_fd.read(32))

        shp_fd.close()


    def load_objects(self, x = 0, y = 0, radius = 0):
        """Loads information from .shp file; only loads information within
           bounds if specified.

           Args:
             x: x coordinate at center of bounding box
             y: y coordinate at center of bounding box
             radius: size of bounding box
        """
        self.load_bounding_box()
        self.items = {}

        if x == 0 or y == 0 or radius == 0:
            self.data_xmin = self.file_xmin
            self.data_xmax = self.file_xmax
            self.data_ymin = self.file_ymin
            self.data_ymax = self.file_ymax
        else:
            self.data_xmin = x - radius
            self.data_xmax = x + radius
            self.data_ymin = y - radius
            self.data_ymax = y + radius

        shp_fd = open('%s.shp' % self.base_filename, 'rb')
        shp_fd.seek(100)

        while True:
            # Process record header
            record_header = shp_fd.read(12)
            if record_header == '':
                break

            record_number, record_length = struct.unpack('>LL',
                    record_header[:8])

            record_shape = struct.unpack('<L', record_header[8:])[0]

            # Process record body
            if record_shape == 0:
                # Record is null
                pass

            elif record_shape == 1:
                # Record is a point
                object_point = shp_fd.read(_POINT_PAIR_SIZE)
                x, y = struct.unpack('dd', object_point)

                if self.data_xmin > x or self.data_xmax < x:
                    continue
                if self.data_ymin > y or self.data_ymax < y:
                    continue

                self.items[record_number] = {'type': 'point',
                        'point': {'x': x, 'y': y}}

            elif record_shape == 3 or record_shape == 5:
                # Record is a polyline
                object_header = shp_fd.read(40)
                object_xmin, object_ymin, object_xmax, object_ymax, \
                        parts, points = struct.unpack('ddddii', object_header)

                if object_xmax < self.data_xmin or \
                        object_xmin > self.data_xmax or \
                        object_ymax < self.data_ymin or \
                        object_ymin > self.data_ymax:

                    # Skip the rest of this record
                    shp_fd.seek((4 * parts) + (_POINT_PAIR_SIZE * points), 1)
                    continue

                shp_fd.seek(4 * parts, 1)

                self.items[record_number] = {'type': 'polyline', 'points': []}

                object_points = shp_fd.read(_POINT_PAIR_SIZE * points)
                for i in xrange(0, len(object_points), _POINT_PAIR_SIZE):
                    x, y = struct.unpack('dd', object_points[i:i+_POINT_PAIR_SIZE])
                    self.items[record_number]['points'].append({'x': x, 'y':y})

            else:
                raise UnknownShape

        shp_fd.close()


    def dbf_load_fields(self):
        """Loads field information from .dbf file"""
        dbf_fd = open('%s.dbf' % self.base_filename, 'rb')

        header_len = struct.unpack('<8xH22x', dbf_fd.read(32))[0]
        num_fields = (header_len / 32) - 1

        self.dbf_fields = [{'name': 'DeletionFlag', 'type': 'C', 'size': 1, 'decimal': 0}]
        for field_num in xrange(num_fields):
            name, type, size, decimal = struct.unpack('<11sc4xBB14x', dbf_fd.read(32))
            name = name.replace('\0', '')
            self.dbf_fields.append({'name': name, 'type': type, 'size': size, 'decimal': decimal})

        dbf_fd.close()


    def dbf_load_objects(self):
        """Takes items loaded from .shp file and fills in information from .dbf
           file.
        """
        self.dbf_load_fields()

        dbf_fd = open('%s.dbf' % self.base_filename, 'rb')
        dbf_header_size = 32 * len(self.dbf_fields)

        record_format = ''.join(['%ds' % field['size'] for field in self.dbf_fields])
        record_size = struct.calcsize(record_format)

        for item in self.items.iterkeys():
            dbf_fd.seek(dbf_header_size + item * record_size)

            record_data = struct.unpack(record_format, dbf_fd.read(record_size))

            for field_num in xrange(len(self.dbf_fields)):
                self.items[item][self.dbf_fields[field_num]['name']] = record_data[field_num]

        dbf_fd.close()


    def view_data(self, xsize = 1024, ysize = 768):
        """Convience function to quick-and-dirty visualize loaded shapefile
           data.

           Args:
             xsize: maximum x resolution of image
             ysize: maximum y resolution of image
        """
        import Image, ImageDraw

        xscale = (self.data_xmax - self.data_xmin) / xsize
        yscale = (self.data_ymax - self.data_ymin) / ysize

        # Scale xsize and ysize to maintain aspect ratio
        xscale = yscale = max(xscale, yscale)
        xsize = (self.data_xmax - self.data_xmin) / xscale
        ysize = (self.data_ymax - self.data_ymin) / yscale

        image = Image.new('RGB', (xsize, ysize), color='#ffffff')
        draw = ImageDraw.Draw(image)

        for item in self.items.itervalues():
            start_x = 0
            start_y = 0
            end_x = 0
            end_y = 0

            if item['type'] != 'polyline':
                continue

            for coordinate in item['points']:
                if start_x == start_y == 0:
                    start_x = (coordinate['x'] - self.data_xmin) / xscale
                    start_y = ysize - (coordinate['y'] - self.data_ymin) / yscale

                else:
                    end_x = (coordinate['x'] - self.data_xmin) / xscale
                    end_y = ysize - (coordinate['y'] - self.data_ymin) / yscale
                    draw.line((start_x, start_y, end_x, end_y), fill='#000000')
                    start_x = end_x
                    start_y = end_y

        del draw

        image.show()
