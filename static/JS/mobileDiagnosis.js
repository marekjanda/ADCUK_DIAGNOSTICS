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
    data.append('primary', mainCause.value);
    data.append('secondary', secondaryCause.value);
    console.log('Data appended');
    diagnosticRequest.send(data);
    console.log('Diagnostic request sent');
    return false;
}