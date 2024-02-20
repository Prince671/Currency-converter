let Base_Url = " https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

        let dropdown = document.querySelectorAll(".dropdown select");
        let btn = document.querySelector('form button');

        for (let select of dropdown) {
            for (Currcode in countryList) {
                let newopt = document.createElement("option");
                newopt.innerText = Currcode;
                newopt.value = Currcode;
                if (select.name === "from" && Currcode === "USD") {
                    newopt.selected = "selected";
                }
                else if (select.name === "to" && Currcode === "INR") {
                    newopt.selected = "selected";
                }
                select.append(newopt);

            }
            select.addEventListener("change", (evt) => {
                updateFlag(evt.target);
            })
        }


        const updateFlag = (element) => {
            let Currcode = element.value;
            let CountryCode = countryList[Currcode];

            let newSrc = `https://flagsapi.com/${CountryCode}/flat/64.png`;
            let img = element.parentElement.querySelector('img');
            img.src = newSrc;
        }

        const CuConvert = async () => {
            let amount = document.querySelector(".amount input");
            let Amtval = amount.value;
            if (Amtval === "" || Amtval < 1) {
                Amtval = 1;
                amount.value = 1;
            }

            let from = document.querySelector(".from select");
            let to = document.querySelector(".To select");

            const url = `${Base_Url}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;

            const respons = await fetch(url);
            // console.log(respons);
            let data = await respons.json();
            // console.log(data);
            let rate = data[to.value.toLowerCase()];
            // console.log(rate);

            let finalval = Amtval * rate;
            console.log(finalval);
            let msg = document.querySelector(".msg");
            msg.innerHTML = `<b>${amount.value} ${from.value} =  ${finalval} ${to.value}</b>`;


        }


        btn.addEventListener("click", (evt) => {
            evt.preventDefault();
            CuConvert();
        })


