/******************************************************************************
 * (c) 2005-2019 Copyright, Real-Time Innovations.  All rights reserved.       *
 * No duplications, whole or partial, manual or electronic, may be made        *
 * without express written permission.  Any such copies, or revisions thereof, *
 * must display this notice unaltered.                                         *
 * This code contains trade secrets of Real-Time Innovations, Inc.             *
 ******************************************************************************/

const path = require('path')
const rti = require('rticonnextdds-connector')
const {Pool} = require("pg");
const configFile = path.join(__dirname, 'ShapeExample.xml')

const run = async () => {
    const connector = new rti.Connector('MyParticipantLibrary::MySubParticipant', configFile)
    const input = connector.getInput('MySubscriber::PressureReader')
    try {
        console.log('Waiting for publications...')
        await input.waitForPublications()

        console.log('Waiting for data...')
        for (let i = 0; i < 500; i++) {
            await input.wait()
            input.take()
            for (const sample of input.samples.validDataIter) {
                // You can obtain all the fields as a JSON object
                const data = sample.getJson()
                console.log('Received x: ' + data.sensor_id + ', ' + data.pressure)
                const res = await pool.query(
                    "INSERT INTO sgs.pressure (time, sensor_id, pressure) VALUES (to_timestamp($1), $2, $3)",
                    [data.capture_time, data.sensor_id, data.pressure]
                );
            }
        }
    } catch (err) {
        console.log('Error encountered: ' + err)
    }
    connector.close()
}


const pool = new Pool({
    user: 'postgres',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
    host: 'localhost',
})

run()
