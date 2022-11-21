/******************************************************************************
 * (c) 2005-2019 Copyright, Real-Time Innovations.  All rights reserved.       *
 * No duplications, whole or partial, manual or electronic, may be made        *
 * without express written permission.  Any such copies, or revisions thereof, *
 * must display this notice unaltered.                                         *
 * This code contains trade secrets of Real-Time Innovations, Inc.             *
 ******************************************************************************/

const sleep = require('sleep')
const path = require('path')
const rti = require('rticonnextdds-connector')
const configFile = path.join(__dirname, '/ShapeExample.xml')


const run = async () => {
    const connector = new rti.Connector('MyParticipantLibrary::MyPubParticipant', configFile)
    const output = connector.getOutput('MyPublisher::LevelWriter')
    try {
        console.log('Waiting for subscriptions...')
        await output.waitForSubscriptions()

        console.log('Writing...')
        for (let i = 0; i < 500; i++) {

            output.instance.setString("capture_time", (Date.now()/1000).toString())
            output.instance.setString("sensor_id", myArgs[0]);
            output.instance.setString("location", myArgs[1]);
            output.instance.setNumber("level", getRandomInt(100,900));
            output.write()

            sleep.msleep(500)
        }

        console.log('Exiting...')
        // Wait for all subscriptions to receive the data before exiting
        await output.wait()
    } catch (err) {
        console.log('Error encountered: ' + err)
    }
    connector.close()
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const myArgs = process.argv.slice(2);
if (myArgs && myArgs.length > 0){
    run()
} else {
    console.log("Pass Sensor ID")
}


