let p;
let s;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('sectionTitle').innerHTML == 'Select Secondary Symptoms'){
        p = document.getElementById('sectionTitle').dataset.primary;
    }
    for (var i = 1; i < 6; i++) {
        Array.prototype.slice.call(document.getElementsByClassName('preset' + i)).forEach(function(el) {
            new Knob(el, new Ui['P' + i]());
            s = el.value;
            document.getElementById('ms').querySelector('h4').innerHTML = primarySymptoms[el.value]
            el.addEventListener('change', function  () {
                //update_options(el.value);
                console.log(el.value + ": " + secondarySymptoms[el.value]);
                s = el.value;
                if (document.getElementById('sectionTitle').dataset.primary){
                    p = document.getElementById('sectionTitle').dataset.primary;
                    document.getElementById('ms').querySelector('h4').innerHTML = secondarySymptoms[p][transferIndex(p,s)];
                } else {
                    document.getElementById('ms').querySelector('h4').innerHTML = primarySymptoms[el.value];
                    if (el.value == "6") {
                        p = el.value;
                        document.getElementById('nButton').style.display = "none";
                        document.getElementById('dButton').style.display = "";
                    } else {
                        document.getElementById('secondSymptomURL').href = 'secondarysymptoms/'+el.value;
                        document.getElementById('nButton').style.display = "";
                        document.getElementById('dButton').style.display = "none";
                    }
                }
            })
        })
    }
})

function alertvalue() {
    let spinnerTemplate = Handlebars.compile(document.querySelector("#spinners").innerHTML);
    let spinners = spinnerTemplate();
    document.getElementById("HP").innerHTML = spinners;
    document.getElementById("LP").innerHTML = spinners;
    
    let mainCause = document.getElementById('MainCause');
    let secondaryCause = document.getElementById('secondSymptomSelect');
    
    if (secondaryCause && secondaryCause.value == 'Select Second Symptom') {
        document.getElementById('error').innerHTML ='Please Select Secondary Symptom!';
        
        document.getElementById("HP").innerHTML = '<h5 id="error" style="color: tomato;">Please Select Secondary Symptom!</h5>';
        document.getElementById("LP").innerHTML = '<h5 id="error" style="color: tomato;">Please Select Secondary Symptom!</h5>';
        return false;
    }
    //console.log(secondaryCause.value);
    //alert("Main Cause: " + mainCause.value + "\n" + "Secondary Cause: " + secondaryCause.value);

    // Create xmlhttprequest
    const diagnosticRequest = new XMLHttpRequest;
    diagnosticRequest.open('POST', '/diagnose');
    console.log("Diagnostic Request opened");
    diagnosticRequest.onload = () => {
        document.getElementById('error').innerHTML = '';
        console.log('Response loaded');
        // Parse the response text
        const res = JSON.parse(diagnosticRequest.responseText);
        console.log(res);
        if (res.status == 'ERROR') {
            document.getElementById('error').innerHTML ='Please Select Secondary Symptom!';
            document.getElementById("HP").innerHTML = '<h5 id="error" style="color: tomato;">Please Select Secondary Symptom!</h5>';
            document.getElementById("LP").innerHTML = '<h5 id="error" style="color: tomato;">Please Select Secondary Symptom!</h5>';
            return false;
        }
        // Check the response
        //alert(res.status)
        HPTempalte = Handlebars.compile(document.querySelector('#hpCauses').innerHTML);
        LPTempalte = Handlebars.compile(document.querySelector('#lpCauses').innerHTML);
        let hps = res.HP;
        let lps = res.LP;
        document.getElementById("HP").innerHTML = '';
        document.getElementById("LP").innerHTML = '';
        if (hps.length == 0) {
            let diagnosis = HPTempalte({'cause': 'No Known Causes'})
            document.getElementById("HP").innerHTML = diagnosis;
        }
        if (lps.length == 0) {
            let diagnosis = LPTempalte({'cause': 'No Known Causes'})
            document.getElementById("LP").innerHTML = diagnosis;
        }
        
        hps.forEach((cause) => {
            let diagnosis = HPTempalte({'cause': cause})
            document.getElementById("HP").innerHTML += diagnosis;
        })

        lps.forEach((cause) => {
            let diagnosis = LPTempalte({'cause': cause})
            document.getElementById("LP").innerHTML += diagnosis;
        })
        return false;
    };
    const data = new FormData();
    if (!p || p > 6) {
        p = document.getElementById('sectionTitle').dataset.primary;
    }
    console.log('FormData created');
    console.log("Primary: " + p);
    data.append('primary', p);
    if (p == "6") {
        console.log("Primary is 6")
        data.append('secondary', "12");
    } else{
        data.append('secondary', transferIndex(p, s));
    }
    
    console.log('Data appended');
    diagnosticRequest.send(data);
    console.log('Diagnostic request sent');
    return false;
}

function transferIndex(p, s) {
    // Transfers secondary symptom select menu value to match back-end data structures
    switch (p) {
        case "0":
            s = s;
            break;
        case "1":
            if (s == "0"){
                s = "4";
            } else {
                s = "5";
            }
            break;
        case "2":
            if (s == "0"){
                s = "6";
            } else {
                s = "4";
            }
            break;   
        case "3":
            if (s == "0"){
                s = "7";
            } else {
                s = "8";
            }
            break; 
        case "4":
            if (s == "0"){
                s = "7";
            } else if (s =="1") {
                s = "8";
            } else {
                s = "9";
            }
            break;
        case "5":
            if (s == "0"){
                s = "10";
            } else {
                s = "11";
            }
            break;
        case "6":
            s = "12";
            break;
        default:
            break;
    }
    console.log("Secondary: " + s);
    return s;
}



