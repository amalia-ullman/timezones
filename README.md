# timezones
scaled against distance


currently in data harvesting mode
how many minutes in a mile?

# basic process
## input 1: amount of steps
- determines how many equal sized chunks to break each timezone into vertically
- size of each chunk determined by amount of steps and the northern and southern most point


## input 2: location
- distance offset from true time (the time on each timezone line) found by comparing distance between picked location and one of the timezone lines
- minutes per distance unit found by dividing sixty minutes by the distance of the western and eastern most points in the chunk
- multiply the minutes per distance by the distance offset to get the minute offset
- either add or subtract the minute offset from the current time to get the scaled time at that location



taylor series to get border lines