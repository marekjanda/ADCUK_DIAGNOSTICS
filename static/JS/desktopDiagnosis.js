let p;
let s;
document.addEventListener('DOMContentLoaded', () => {
    for (var i = 1; i < 6; i++) {
        Array.prototype.slice.call(document.getElementsByClassName('preset' + i)).forEach(function(el) {
            new Knob(el, new Ui['P' + i]());
            el.addEventListener('change', function  () {
                //update_options(el.value);
                console.log(el.value + ": " + secondarySymptoms[el.value]);
                s = el.value;
                if (document.getElementById('sectionTitle').innerHTML == 'Select Secondary Symptoms'){
                    let p = document.getElementById('sectionTitle').dataset.primary;
                    document.getElementById('ms').querySelector('h4').innerHTML = secondarySymptoms[p][el.value];
                } else {
                    document.getElementById('ms').querySelector('h4').innerHTML = primarySymptoms[el.value];
                    document.getElementById('secondSymptomURL').href = 'secondarysymptoms/'+el.value;
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
    
    if (secondaryCause.value == 'Select Second Symptom') {
        document.getElementById('error').innerHTML ='Please Select Secondary Symptom!';
        
        document.getElementById("HP").innerHTML = '<h5 id="error" style="color: tomato;">Please Select Secondary Symptom!</h5>';
        document.getElementById("LP").innerHTML = '<h5 id="error" style="color: tomato;">Please Select Secondary Symptom!</h5>';
        return false;
    }
    console.log(secondaryCause.value);
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
    console.log('FormData created');
    data.append('primary', p);
    data.append('secondary', transferIndex(p, s));
    console.log('Data appended');
    diagnosticRequest.send(data);
    console.log('Diagnostic request sent');
    return false;
}

function transferIndex(p, s) {
    switch (p) {
        case "0":
            if (s == "0"){
                s = "4";
            } else {
                s = "5";
            }
            break;
        case "1":
            break;
        case "2":
            break;   
        case "3":
            break; 
        case "4":
            break;
        case "5":
            break;
        case "6":
            break;
        default:
            break;
    }
}



