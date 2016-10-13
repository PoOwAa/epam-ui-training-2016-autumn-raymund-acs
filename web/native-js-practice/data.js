/**
 * Created by ui2016 on 10/13/2016.
 */
var attrs = 'name age city gender';
var values = [
    ['Joe', 22, 'New York City', 'male'],
    ['Jane', 85, 'Las Vegas', 'female'],
    ['Jack', 55, 'London', 'male']
];

var people = [];

attrs = attrs.split(' ');

values.forEach(function(ppl, ppli) {
    people[ppli] = {};
    attrs.forEach(function(item, index) {
        people[ppli][item] = ppl[index];
    });
});

console.log(people);