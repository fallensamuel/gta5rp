function GovPassportPading(str, max = 5) {
    const string = str.toString();
    return string.length < max ? GovPassportPading(`0${string}`, max) : string;
}
function GovSendData(data) {
    data = JSON.parse(data);
    document.getElementById('GovPassport_name').innerHTML = data.Name;
    document.getElementById('GovPassport_id').innerHTML = GovPassportPading(data.ID.toString(), 5);
    document.getElementById('GovPassport_rank').innerHTML = data.Rank;
}

// fbiSendData(JSON.stringify({ Name: 'Ilya Gilfanov', ID: 1 }));
