let todoLista = []

function megjelenit() {
    let lista = document.getElementById("lista")
    lista.innerHTML = ""
    todoLista.forEach(function(element){
        let li = document.createElement("li")
        li.innerHTML = element.text
        let input = document.createElement("input")
        input.type = "checkbox"
        input.checked = element.done == true || element.done == '1'

        input.addEventListener('input', function(event){
            let todoItem = {
                id: element.id,
                text: element.text,
                done: !(element.done == true || element.done == '1'),
            }
            fetch('http://localhost:8080/todos/' + todoItem.id, {
                method: 'PUT',
                body: JSON.stringify(todoItem),
            }).then(function(response){
                if (response.ok){
                    element.done = todoItem.done
                }
                megjelenit()
            }).catch(function(error){
                window.alert("Hiba")
                megjelenit()
            })

        })

        li.prepend(input)
        lista.appendChild(li)
    })
}


window.addEventListener("DOMContentLoaded", function() {
        fetch('http://localhost:8080/todos')
            .then(function(response) {
                if (!response.ok){
                    throw new Error("HTTP hiba: " + response.statusText)
                }else{
                    return response.json()
                }
            }).then(function(eredmeny) {
                todoLista = eredmeny
                console.log(eredmeny)
                megjelenit()
            }).catch(function(error) {
                window.alert("HIBA!!!" + error.message)
            })

        document.getElementById("todoButton")
            .addEventListener("click", function(){
                let todoText = document.getElementById("todoText").value
                let todoItem = {
                    text: todoText,
                    done: false
                }
                fetch('http://localhost:8080/todos', {
                    method: 'POST',
                    body: JSON.stringify(todoItem),
                }).then(function(response){
                    if (response.ok){
                        todoLista.push(todoItem)
                        megjelenit()
                        window.alert("Siker")
                    }else{
                        throw new Error(response.statusText)
                    }
                }).catch(function(error){
                    window.alert("HIBA!!!" + error.message)
                })

            })

})