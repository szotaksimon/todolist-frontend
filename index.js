window.addEventListener("DOMContentLoaded", function() {
        fetch('http://localhost:8080/todos')
            .then(function(response) {
                if (!response.ok){
                    throw new Error("HTTP hiba: " + response.statusText)
                }else{
                    return response.json()
                }
            }).then(function(eredmeny) {
                console.log(eredmeny)
                let lista = document.getElementById("lista")
                eredmeny.forEach(function(element){
                    let li = document.createElement("li")
                    li.innerHTML = element.text
                    lista.appendChild(li)
                })
            }).catch(function(error) {
                //window.alert("HIBA!!!" + error.message)
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
                        window.alert("Siker")
                    }else{
                        throw new Error(response.statusText)
                    }
                }).catch(function(error){
                    window.alert("HIBA!!!" + error.message)
                })

            })

})