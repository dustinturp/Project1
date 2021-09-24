const state = [
{ name: 'AL' },
{ name: 'AK'},
{ name: 'AS'},
{ name: 'AZ'},
{ name: 'AR'},
{ name: 'CA'},
{ name: 'CO'},
{ name: 'CT'},
{ name: 'DE'},
{ name: 'DC'},
{ name: 'FM'},
{ name: 'FL'},
{ name: 'GA'},
{ name: 'GU'},
{ name: 'HI'},
{ name: 'ID'},
{ name: 'IL'},
{ name: 'IN'},
{ name: 'IA'},
{ name: 'KS'},
{ name: 'KY'},
{ name: 'LA'},
{ name: 'ME'},
{ name: 'MH'},
{ name: 'MD'},
{ name: 'MA'},
{ name: 'MI'},
{ name: 'MN'},
{ name: 'MS'},
{ name: 'MO'},
{ name: 'MT'},
{ name: 'NE'},
{ name: 'NV'},
{ name: 'NH'},
{ name: 'NJ'},
{ name: 'NM'},
{ name: 'NY'},
{ name: 'NC'},
{ name: 'ND'},
{ name: 'MP'},
{ name: 'OH'},
{ name: 'OK'},
{ name: 'OR'},
{ name: 'PW'},
{ name: 'PA'},
{ name: 'PR'},
{ name: 'RI'},
{ name: 'SC'},
{ name: 'SD'},
{ name: 'TN'},
{ name: 'TX'},
{ name: 'UT'},
{ name: 'VT'},
{ name: 'VI'},
{ name: 'VA'},
{ name: 'WA'},
{ name: 'WV'},
{ name: 'WI'},
{ name: 'WY'}
];

const list = document.getElementById('list');

function setList (group) {
    clearList();
    for (const park of group){
        const item = document.createElement ('li');
        item.classList.add('list-group-item');
        const text = document.createTextNode(park.name);
        item.appendChild(text);
        list.addpendChild(item);
    }
    if (group.length === 0) {
        setNoResults();
    }
}

function clearList (){
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

function setNoResults () {
        const item = document.createElement ('li');
        item.classList.add('list-group-item');
        const text = document.createTextNode("No results found.");
        item.appendChild(text);
        list.addpendChild(item);
}

const searchInput = document.getElementById('state');

searchInput.addEventListener('input', (event) => {
    const value = (event.target.value);
    if (value && value.trim().length> 0) {
        value = value.trim().toLowerCase();
        setList (state.filter(park => {
            return park.name.includes
        }));
    } else {
        clearList();
    }
});