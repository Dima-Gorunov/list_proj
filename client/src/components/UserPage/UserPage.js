import React, {useState} from 'react';
import {AuthApi} from "../../Api/AuthApi";

const UserPage = (props) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file)
        const previewUrl = URL.createObjectURL(file);
        setPreviewUrl(previewUrl);
    };

    const saveAvatar = async (value) => {
        if (!value) {
            console.log("not save")
            setSelectedFile(null)
            setPreviewUrl(null)
            return
        }
        const formData = new FormData()
        formData.append("file", selectedFile)
        await AuthApi.setAvatar(formData).then(response => {
            console.log(response);
        })
        console.log("save")
    }

    return (
        <div className="d-flex p-3 dark_container">
            <div className="me-4 d-flex row" style={{width: "150px", height: "200px"}}>
                {!previewUrl &&
                <img src={props.User.Avatar || "https://vsegda-pomnim.com/uploads/posts/2022-04/1649232769_58-vsegda-pomnim-com-p-pustoe-litso-foto-76.jpg"}
                      alt=""/>}
                <label htmlFor="file">
                    <input type="file" accept=".jpeg, .jpg, .png" id="file" onChange={handleFileInputChange} hidden={true}/>
                    {previewUrl &&
                    <img src={previewUrl} style={{maxWidth: "150px", maxHeight: "200px"}} alt="Preview"/>}
                    {!previewUrl && <div style={{cursor:"pointer"}}>поменять аватар</div>}
                </label>
                <div style={{width: "35px"}}>
                    {previewUrl && <div>
                        Сохранить?
                        <button onClick={() => saveAvatar(true)}>да</button>
                        <button onClick={() => saveAvatar(false)}>нет</button>
                    </div>}
                </div>
            </div>
            <div className="d-flex row">
                <div>
                    Email: {props.User.Email}
                </div>
                <div>
                    Role: {props.User.Role}
                </div>
                <div>
                    Name: {props.User.Username || "noname"}
                </div>
            </div>
        </div>
    );
};

export default UserPage;