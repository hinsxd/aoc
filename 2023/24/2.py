import sympy

x, y, z, vx, vy, vz = sympy.symbols("x y z vx vy vz")

lines = [tuple(map(int, line.replace("@", ",").split(","))) for line in open(0)]

eqs = []

for rx, ry, rz, vrx, vry, vrz in lines[:10]:
    eqs.append((x - rx) * (vry - vy) - (y - ry) * (vrx - vx))
    eqs.append((y - ry) * (vrz - vz) - (z - rz) * (vry - vy))

sols = sympy.solve(eqs)
sol = [sol for sol in sols if all(x % 1 == 0 for x in sol.values())][0]
print(sol[x] + sol[y] + sol[z])
