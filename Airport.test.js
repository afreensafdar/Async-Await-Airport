const Airport = require('./Airport');
const Plane = require('./Plane');
const Passenger = require('./Passenger');
const Bag = require('./Bag');
const fsp = require('fs').promises; 
const fs = require('fs'); 
const { doesNotMatch, fail } = require('assert');

describe('Airport', () => {

    // clean up before each test
    beforeEach(() => {
        const airports = Airport.airports;
        while (airports.length) {
            airports.pop();
          }
      });

    
    test('has a name, terminal and gates', () => {
        // given
        const LHR = new Airport('LHR', 2, 3);

        // then
        expect(LHR.name).toBe('LHR');
        expect(LHR.terminals).toBe(2);
        expect(LHR.gates).toBe(3);
    });

    test('each airport knows about all the others', () => {
        // given
        const LAX = new Airport('LAX');

        // then
        expect(Airport.airports).toBeTruthy();
        expect(Airport.airports.length).toBe(1);
    });

    test('an airport has planes', () => {
        // given
        const LHR = new Airport('LHR');
        const LAX = new Airport('LAX');

        const plane1 = new Plane();
        plane1.setOrigin('LHR');
        plane1.setDestination('LAX');

        const pax1 = new Passenger({name: "fred"});

        const cabinLuggage = new Bag(8);
        const holdLuggage = new Bag(25);
        pax1.addBag(cabinLuggage);
        pax1.addBag(holdLuggage);

        plane1.boardPassenger(pax1);

        // when
        LHR.addPlane(plane1);

        // then
        expect(plane1.origin).toBe('LHR');
        expect(LHR.planes.length).toBe(1);
        expect(plane1.passengers.length).toBe(1);
        expect(plane1.passengers[0]).toMatchObject(pax1);
        expect(plane1.passengers[0].bags[0].weight).toBe(8);
    });

    test('takeOff', () => {
        // given
        const LHR = new Airport('LHR');
        const LAX = new Airport('LAX');

        const plane1 = new Plane();
        plane1.setOrigin('LHR');
        plane1.setDestination('LAX');
        LHR.addPlane(plane1);

        // when
        LHR.takeOff(plane1);

        // then
        expect(LHR.planes.length).toBe(0);
        expect(LAX.planes.length).toBe(1);
        expect(LAX.planes[0]).toMatchObject(plane1); 
    });

    test('land', () => {
        // given
        const LHR = new Airport('LHR');
        const LAX = new Airport('LAX');
        const plane1 = new Plane();
        plane1.setOrigin('LHR');
        plane1.setDestination('LAX');
        LHR.addPlane(plane1);
        LHR.takeOff(plane1);

        // when
        LAX.land(plane1);

        // then
        expect(LAX.planes.length).toBe(0);
    });

    test('getInfo with Callback', (done) => { // async indicator to Jest
        // Add your test here
        const LHR = new Airport('LHR')
        //when
        LHR.getInfoCallback((err, foundInfo) => {
            //then
            console.log("What did we find? ", foundInfo)
            expect(foundInfo.city).toBe('London')
            done()
        })  
    
    });

    test('getInfo with Promise', () => { // async indicator to Jest
       // Add your test here
        const LHR =new Airport('LHR')
        //when 
        return LHR.getInfoPromise()
            //then
          //  console.log("Found Info",foundInfo)
            .then(info =>{
                expect(info.city).toBe('London')
            })
        })

    
    // const LHR = new Airport('LHR')
    // return LHR.getInfo()
    //     .then(info => {
    //         expect(info.city).toEqual('Paris')
    //     })
    //     .catch(err => {
    //         expect(err).toBeNull()
    //     })

    });

    test('getInfo with Async Await',  async() => { // async indicator to Jest
       // Add your test here

    const LHR =new Airport('LHR')
    let info=await LHR.getInfoAsyncAwait('LHR')
    expect(info.city).toBe("London")



    
    });
