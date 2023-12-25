from math import prod
import networkx as nx

stream = open(0)
data = {}
for ll in stream:
    data[ll.split(":")[0]] = ll.split(":")[1].strip().split()

G = nx.Graph()
for c, cc in data.items():
    for ci in cc:
        G.add_edge(c, ci)
cuts = nx.minimum_edge_cut(G)
G.remove_edges_from(cuts)

rg = list(nx.connected_components(G))
print("Part 1:", prod(len(i) for i in rg))
