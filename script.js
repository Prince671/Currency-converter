let Base_Url = "https://api.exchangerate-api.com/v4/latest/";

        let dropdown = document.querySelectorAll(".dropdown select");
        let btn = document.querySelector("form button");


        for (let select of dropdown) {
            for (code in countryList) {
                let newopt = document.createElement("option");
                newopt.innerText = code;
                newopt.value = code;
                select.append(newopt);

                if (select.name === "from" && code === "USD") {
                    newopt.selected = "selected";
                }

                else if (select.name === "to" && code === "INR") {
                    newopt.selected = "selected";
                }

            }

            select.addEventListener("change", (evt) => {
                updateFlag(evt.target);     // evt.target tell us that where the change is occuring
            })

        }

        const updateFlag = (element) => {
            let curr = element.value;
            let currcode = countryList[curr];
            // console.log(curr, currcode)
            let img = element.parentElement.querySelector(' img');
            let newsource = `https://flagsapi.com/${currcode}/flat/64.png`;
            img.src = newsource;
        }

        btn.addEventListener("click", async (evt) => {
            evt.preventDefault();
            let amount = document.querySelector('.amount input');
            if (amount.value === '' || amount.value === 0) {
                amount.value = 1;
            }

            let from = document.querySelector(".from select");
            let to = document.querySelector(".to select");

            let URL = `${Base_Url}/${from.value}`;
            let toURL = `${Base_Url}/${to.value}`;
            console.log(URL, toURL);
            let rate = await fetch(URL);
            // console.log(rate)
            let data = await rate.json();
            let showExRateOfToVal = data.rates[to.value];
            let finalExRate = amount.value * showExRateOfToVal;

            let msg = document.querySelector(".msg");
            msg.innerHTML = `<b>${amount.value} ${from.value} = ${finalExRate} ${to.value}</b>`;


        })
