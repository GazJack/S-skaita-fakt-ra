console.log('veikia ar ne');

fetch('https://in3.dev/inv/') // pasiimam duomenis is API
.then(response => response.json()) // Paverčiam atsakymą į JSON formatą
.then(data => {
    console.log(data); //patikrinam ka gaunam is API    

document.getElementById('pardavejas').innerText = data.company.seller.name;
document.getElementById('pardavejoAdresas').innerText = data.company.seller.address;
document.getElementById('pardavejoImonesKodas').innerText = data.company.seller.code;
document.getElementById('pardavejoPVMMoketojoKodas').innerText = data.company.seller.vat;
document.getElementById('pardavejoTelNr').innerText = data.company.seller.phone;
document.getElementById('pardavejoElPastas').innerText = data.company.seller.email;

document.getElementById('pirkejas').innerText = data.company.buyer.name;
document.getElementById('pirkejoAdresas').innerText = data.company.buyer.address;
document.getElementById('pirkejoImonesKodas').innerText = data.company.buyer.code;
document.getElementById('pirkejoPVMMoketojoKodas').innerText = data.company.buyer.vat;
document.getElementById('pirkejoTelNr').innerText = data.company.buyer.phone;
document.getElementById('pirkejoElPastas').innerText = data.company.buyer.email;

document.getElementById('saskaitosNr').innerText = data.number;
document.getElementById('saskaitosNr').innerHTML = "&nbsp;" + data.number;
})

.catch(error => console.error('Error:', error)); // Jei įvyksta klaida

// fetch('https://in3.dev/inv/')
// .then(response => response.json())
// .then(data => {
//     const itemsTable = document.getElementById('pirkiniai');
//     let tarpineKaina = 0;

//     data.items.forEach(item => {
        
//      // Nuolaida yra procentinė, tiesiog rodyti su '%'
//      const nuolaida = item.discount && item.discount.type === 'percentage'
//      ? `${item.discount.value}%`  // Pridedame % ženklą prie nuolaidos
//      : '-';  // Jei nėra nuolaidos, rodome 0€

//         const eile = document.createElement('tr');

//         eile.innerHTML = 
//         `<td>${item.description}</td>
//          <td>${item.quantity}</td>
//          <td>${item.price.toFixed(2)} € </td>
//          <td>${nuolaida}</td>
//          <td>${item.shipping ? `${item.delivery.toFixed(2)} €` : '0 €'}</td>`;
        
//          const nuolaidosSuma = item.discount && item.discount.type === 'percentage' 
//          ? (item.price * item.discount.value / 100) 
//          : (item.discount && item.discount.type === 'fixed' ? item.discount.value : 0);

//          tarpineKaina += item.quantity * item.price - nuolaidosSuma;

        
//          //  tarpineKaina += item.quantity * item.price - (item.discount || 0); // atnaujinama kaina su nuolaida
//          itemsTable.appendChild(eile);
//     });

    

//     document.getElementById('tarpineKaina').innerText = tarpineKaina.toFixed(2) + '€';
//     const pvm = tarpineKaina * 0.21;
//     document.getElementById('pvm').innerText = pvm.toFixed(2) + '€';
//     const galutineKaina = tarpineKaina + pvm;
//     document.getElementById('galutineKaina').innerText = galutineKaina.toFixed(2) + '€';
// })
// .catch(error => console.error('Error:', error));


fetch('https://in3.dev/inv/')
.then(response => response.json())
.then(data => {
    const itemsTable = document.getElementById('pirkiniai');
    let tarpineKaina = 0;

    data.items.forEach(item => {
        
        // Nuolaida yra procentinė, tiesiog rodyti su '%'
        const nuolaida = item.discount && item.discount.type === 'percentage'
         ? `${item.discount.value}%`  // Pridedame % ženklą prie nuolaidos
         : '-';  // Jei nėra nuolaidos, rodome '-'

        const eile = document.createElement('tr');

        eile.innerHTML = 
        `<td>${item.description}</td>
         <td>${item.quantity}</td>
         <td>${item.price.toFixed(2)} € </td>
         <td>${nuolaida}</td>`; 
        


         
        // Skaičiuojame nuolaidos sumą
        const nuolaidosSuma = item.discount && item.discount.type === 'percentage' 
         ? (item.price * item.discount.value / 100) 
         : (item.discount && item.discount.type === 'fixed' ? item.discount.value : 0);

        // Atnaujiname tarpinę kainą (prekių be pristatymo)
        tarpineKaina += item.quantity * item.price - nuolaidosSuma;

        // Pridedame prekę prie lentelės
        itemsTable.appendChild(eile);
    });

    // PRISTATYMO KAINA (pristatymas rodomas HTML'e su id 'pristatymas')
    const pristatymoKaina = data.shippingPrice || 0;  // Jei nėra pristatymo kainos, pridedame 0
    document.getElementById('pristatymas').innerText = pristatymoKaina.toFixed(2) + ' €';  // Rodyti pristatymo kainą

    // Bendra kaina su pristatymo kaina
    const bendrasKainaSuPristatymu = tarpineKaina + pristatymoKaina;

    // Atvaizduojame bendrą sumą be pristatymo kainos lentelėje
    document.getElementById('tarpineKaina').innerText = tarpineKaina.toFixed(2) + '€';
    const pvm = bendrasKainaSuPristatymu * 0.21;
    document.getElementById('pvm').innerText = pvm.toFixed(2) + '€';

    // Rodyti galutinę sumą su pristatymo kaina ir PVM
    const galutineKaina = bendrasKainaSuPristatymu + pvm;
    document.getElementById('galutineKaina').innerText = galutineKaina.toFixed(2) + '€';
})
.catch(error => console.error('Error:', error));
