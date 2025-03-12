
function GovDocs(data) {
    data = JSON.parse(data);
    document.getElementById("GovDocs_name").innerHTML = data.name;
    document.getElementById("GovDocs_rank").innerHTML = data.rank;
    document.getElementById("GovDocs_id").innerHTML = `№ ${data.id}`;
}