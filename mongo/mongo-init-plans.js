db = db.getSiblingDB('test');

if (db.plans.count() === 0) {
    db.plans.insert([
        {
            id: '1e8cea65-7655-43b8-88d6-17a12b0a43b6',
            name: 'Estudante',
            price: '30.00',
            dataLimit: '8',
            callLimit: '100',
        },
        {
            id: 'aac9ddb9-778e-434d-8d71-b78f855b1acf',
            name: 'Trabalho',
            price: '55.00',
            dataLimit: '25',
            callLimit: '',
        },
        {
            id: '2418ca86-55b0-490d-beb3-5f9d58445289',
            name: 'Viagem',
            price: '70.00',
            dataLimit: '60',
            callLimit: '',
        },
        {
            id: 'a4630f04-6fc9-4702-aada-ff973ec7b6a7',
            name: 'Família',
            price: '110.00',
            dataLimit: '150',
            callLimit: '',
        },
    ]);
}
