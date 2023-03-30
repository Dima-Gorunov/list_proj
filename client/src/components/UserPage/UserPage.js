import React, {useState} from 'react';
import AvatarDefaultImg from "../../Svg/AvatarDefault.jpg"
import CustomButton from "../CustomElements/CustomButton";

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
        props.setAvatarThunk(formData)
        console.log("save")
    }

    return (
        <div className="d-flex p-4 dark_container">
            <div className="d-flex justify-content-center row me-4" style={{width: "200px"}}>
                {!previewUrl &&
                <div className="text-center mb-3">
                    <img style={{width: "150px", height: "200px", objectFit: "cover"}}
                         src={props.User.Avatar || AvatarDefaultImg}
                         alt=""/>
                </div>
                }
                <label className="text-center" htmlFor="file">
                    <input type="file" accept=".jpeg, .jpg, .png" id="file" onChange={handleFileInputChange}
                           hidden={true}/>
                    {previewUrl &&
                    <img src={previewUrl} style={{width: "150px", height: "200px", objectFit: "cover"}} alt="Preview"/>}
                    {!previewUrl && <div style={{
                        minHeight: "5px",
                        minWidth: "35px",
                        backgroundColor: "var(--background-primary-color)",
                        color: "white",
                        padding: "4px",
                        borderRadius: "5px",
                        border: "1px solid white",
                        cursor: "pointer"
                    }}>поменять аватар</div>}
                </label>
                <div>
                    {previewUrl && <div className="d-flex row">
                        <div className="text-center">
                            Сохранить?
                        </div>
                        <div className="d-flex justify-content-around">
                            <CustomButton onClick={() => saveAvatar(true)}>да</CustomButton>
                            <CustomButton onClick={() => saveAvatar(false)}>нет</CustomButton>
                        </div>
                    </div>}
                </div>
            </div>
            <div className="">
                <div>
                    Information
                </div>
                <div>
                    <div>
                        Email: {props.User.Email}
                    </div>
                    <div>
                        Role: {props.User.Role}
                    </div>
                    <div>
                        Name: {props.User.Username || "noname"}
                    </div>
                    <div>
                        first_name: {props.User.first_name}
                    </div>
                    <div>
                        last_name: {props.User.last_name}
                    </div>
                    <div>
                        gender: {props.User.gender}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;