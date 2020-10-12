# Scripts

You can replace bash scripts with Python scripts.

prc = subprocess.Popen()

to launch anything that can be launched on the command-line.

Pass in param

stdout=subprocess.PIPE

and access what would have been written to console:

out = prc.communicate()[0]

Which you can analyze with regular expressions.
