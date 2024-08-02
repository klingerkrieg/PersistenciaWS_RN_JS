
export async function getAll(){
    
    const json = await fetch(global.wsIP+'/produtos').then(data => {
            return data.json();
    });

    return json;
    
}


export async function get(id){
    
    let json = await fetch(global.wsIP+'/produtos/'+id).then(data => {
        return data.json();
    });
    return json;
    
}

export async function save(dados){
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    };

    let json = await fetch(global.wsIP+'/produtos', options).then(data => {
        if (!data.ok) {
            throw Error(data.status);
        }
        return data.json();
    });

    return json;
}


export async function update(dados){

    const options = {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    };

    let json = await fetch(global.wsIP+'/produtos', options).then(data => {
        if (!data.ok) {
            throw Error(data.status);
        }
        return data.json();
    });

    return json;
}


export async function del(id){
    var dados = {'id':id};
    
    const options = {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    };

    let json = await fetch(global.wsIP+'/produtos', options).then(data => {
        if (!data.ok) {
            throw Error(data.status);
        }
        return data.json();
    });
    
    return json;
}