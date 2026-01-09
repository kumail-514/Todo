    let inputName = document.querySelector('.name');
    let addButton = document.querySelector('.addBtn');
    let todo = document.querySelector('.todo');
    let alltodos = document.querySelector(".alltodos")
    let todoArr = [];
    let count = 0;

    const toaster = new ToasterUi();


        
        let data = JSON.parse(localStorage.getItem('data')) || [];
        showData();



    addButton.addEventListener('click', () => {
        todoFunc();
    });

    function todoFunc() {
        let inputname = inputName.value;

        if (inputname == "") {
            const options = {
                duration: 2000,
                styles: {
                    backgroundColor: '#fcfcfcff',
                    color: '#ff0d00ff',
                    border: '1px solid #ffffff',
                    fontSize: "1.2rem",
                    fontWeight: "bold"
                },
            };
            return toaster.addToast("Please Enter Your Name")
        }

        // create object //
        let obj = {
            name: inputname,
            id: count,
        }
        data.push(obj);
        localStorage.setItem('data', JSON.stringify(data));
        toaster.addToast("ADD DATA SUCCESFULLY");

        count++;
        showData();
        inputName.value = ""
    }



    function showData() {

        todo.innerHTML = ""     
        
        data.forEach((items) => {
            let mainDiv = document.createElement('div');
            mainDiv.className = "flex items-center gap-2 justify-between bg-slate-700 px-4 py-3 rounded-xl";

            let span = document.createElement('span');
            span.className = "text-white";
            span.textContent = items.name;

            let buttons = document.createElement('div');
            buttons.className = "flex gap-5";

            let update = document.createElement("button");
            update.className = "text-blue-400 hover:text-blue-500 text-sm";
            update.textContent = "EDIT";

            let del = document.createElement("button");
            del.className = "text-red-400 hover:text-red-500";
            del.textContent = "X";

            mainDiv.appendChild(span);
            mainDiv.appendChild(buttons);

            buttons.appendChild(update)
            buttons.appendChild(del)

            todo.appendChild(mainDiv);

            ///udpate event
            update.addEventListener('click', () => {
                updateFunc(mainDiv, items);
            });

            //delete event 
            del.addEventListener('click', () => {
                deleteFunc(items, mainDiv);
            })
        });
    }

    function deleteFunc(items, mainDiv) {
        data = data.filter((cur) => {
            return cur.id !== items.id;
        });
        localStorage.setItem('data', JSON.stringify(data)); 

        mainDiv.remove();
        toaster.addToast("DELETE RECORD")
    }


    function updateFunc(mainDiv, items) {
        mainDiv.innerHTML = "";

        let updateInput = document.createElement('input');
        updateInput.type = "text";
        updateInput.value = items.name;
        updateInput.className = "rounded-[2px] w-full outline-none border border-2 border-cyan-500 text-[1rem] font-semibold bg-slate-700 text-white placeholder-slate-400 px-5 py-2";

        let save = document.createElement('button');
        save.textContent = "SAVE";
        save.className = "px-2 py-2 rounded-[2px] w-1/3 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 active:scale-95 transition";

        mainDiv.appendChild(updateInput);
        mainDiv.appendChild(save);


        ///save event //

        save.addEventListener('click', () => {
            let inputVal = updateInput.value;
            items.name = inputVal;

            toaster.addToast("UPDATE DATA SUCCESSFULLY")

            mainDiv.innerHTML = "";

            let span = document.createElement('span');
            span.className = "text-white";
            span.textContent = items.name;
            // local storage set item //
            localStorage.setItem('data', JSON.stringify(data)); 

            let buttons = document.createElement('div');
            buttons.className = "flex gap-5";

            let update = document.createElement("button");
            update.className = "text-blue-400 hover:text-blue-500 text-sm";
            update.textContent = "EDIT";

            let del = document.createElement("button");
            del.className = "text-red-400 hover:text-red-500";
            del.textContent = "X";

            buttons.appendChild(update);
            buttons.appendChild(del);

            mainDiv.appendChild(span);
            mainDiv.appendChild(buttons);

            update.addEventListener('click', () => {
                updateFunc(mainDiv, items);
            });

            del.addEventListener('click', () => {
                deleteFunc(items, mainDiv);
            });
        });
    }




