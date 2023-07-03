let data = [];
const viewData = () => {
    document.getElementById('editbtn').style.display = "none";
    document.getElementById('addbtn').style.display = "block";
    let record = JSON.parse(localStorage.getItem('user'));
    let val = (record == null) ? [] : record;
    let tbl = "";
    val.map((v) => {
        const { userid, email } = v;
        tbl += `
                        <tr class="tr">
                            <td class="td">${email}</td>
                            <td class="td d-flex">
                                <button onclick="deleteData(${userid})" class="r-btn">D</button>
                                <button onclick="editData(${userid})" class="r-btn">E</button>
                            </td>
                        </tr>
        `
    })
    document.getElementById('record').innerHTML = tbl;
}
viewData();
const save = (id) => {
    let userid = document.getElementById('editid').value;
    if (userid) {
        let alldata = JSON.parse(localStorage.getItem('user'));
        alldata.map((val) => {
            if (val.userid == userid) {
                val.email = document.getElementById('email').value.toUpperCase();
            }
            return val;
        });
        localStorage.setItem('user', JSON.stringify(alldata));
        alert('User successfully updated');
        viewData();
        document.getElementById('editid').value = '';
    } else {
        let email = document.getElementById('email').value.toUpperCase();
        let obj = {
            userid: Math.floor(Math.random() * 100000),
            email: email,
        }
        if (localStorage.getItem('user') === null || localStorage.getItem('user') === undefined) {
            data.push(obj);
            localStorage.setItem('user', JSON.stringify(data));
        } else {
            let val = JSON.parse(localStorage.getItem('user'));
            val.push(obj);
            localStorage.setItem('user', JSON.stringify(val));
        }
        viewData();
    }
    document.getElementById('email').value = "";
}
const deleteData = (id) => {
    let alldata = JSON.parse(localStorage.getItem('user'));
    let ans = alldata.filter((val) => {
        return val.userid != id
    })
    localStorage.setItem('user', JSON.stringify(ans));
    viewData();
}
const editData = (id) => {
    document.getElementById('addbtn').style.display = "none";
    document.getElementById('editbtn').style.display = "block";
    document.getElementById('editid').value = id;
    let val = JSON.parse(localStorage.getItem('user'));
    let ans = val.filter((v) => {
        return v.userid == id;
    });
    document.getElementById('email').value = ans[0].email;
}
const deleteAllData = (id) => {
    let alldata = JSON.parse(localStorage.getItem('user'));
    let ans = alldata.filter((val) => {
        return val.userid == id
    })
    localStorage.setItem('user', JSON.stringify(ans));
    viewData();
}