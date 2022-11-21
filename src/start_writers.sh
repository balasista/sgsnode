node sgs_temperature_writer.js 100 'BF1' &
node sgs_temperature_writer.js 200 'BF2' &
node sgs_temperature_writer.js 300 'BF3' &
node sgs_level_writer.js 1000 'Height 100' &
node sgs_level_writer.js 1001 'Height 150' &
node sgs_level_writer.js 1002 'Height 225' &
node sgs_pressure_writer.js 501 'Gas Flow' &
node sgs_pressure_writer.js 502 'Molten Metal Nozzle 1' &
node sgs_pressure_writer.js 503 'Molten Metal Nozzle 2' &
node sgs_temperature_reader.js &
node sgs_level_reader.js &
node sgs_pressure_reader.js &
