import shapefile
import sys

def uniq(seq):
    seen = set()
    seen_add = seen.add
    return [ x for x in seq if x not in seen and not seen_add(x)]


def consec_reduce(a):
    out = list()
    old = None
    for v in a:
        if v != old:
            out.append(v)
        old = v
    return out


def remove_seams(a):
    out = list()
    n = len(a)
    i=0
    while i < n:
        out.append(a[i])
        if i < n-2:
            if a[i] == a[i+2]:
                i = i + 2
        i = i + 1
    return out

def process_seams(a):
    out = a
    ol = 0
    while len(out) != ol:
        ol = len(out)
        out = remove_seams(out)
    return out


sf = shapefile.Reader('continents/continent.dbf')
names = sf.records()
shapes = sf.shapes()
report = {'nodes': 0}

out = dict()

factor = float(sys.argv[1]) if len(sys.argv) > 1 else 1

print '<?xml version="1.0" encoding="utf-8"?>'
print '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 3600 1800">'
for i in range(len(names)):
    pointset = shapes[i].points
    name = names[i][0]
    print '\t<g title="%s">' % name
    parts = shapes[i].parts
    group = list()
    j=0;
    lb=0;
    for i in parts:
        ub = parts[j] if j < len(parts) else None
        ps = pointset[lb:ub]
        factored = [ (int(x*factor)+180*factor, int(y*-factor)+90*factor) for x, y in ps ]
        normalized = [(x*(10/factor),y*(10/factor)) for x,y in factored]
        deduped = consec_reduce(normalized)
        reduced = process_seams(deduped)
        report['nodes'] += (len(deduped)-len(reduced))
        
        if len(reduced) > 3:
            group.append(reduced)
            # print ['%d,%d' % (x,y) for x,y in reduced].join('')
            print '\t\t<polygon points="%s"/>' % (' '.join(['%d,%d' % (x,y) for x,y in reduced]))
        j = j + 1
        lb = ub+1
    out[name] = group
    print '\t</g>'
print '</svg>'
print '<!-- processing removed %d nodes -->' % (report['nodes'])

# import pdb; pdb.set_trace()