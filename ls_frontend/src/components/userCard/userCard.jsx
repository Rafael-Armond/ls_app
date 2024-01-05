import { useState } from 'react';
import PropTypes from 'prop-types';
import { CardContainer, Avatar, UserInfo, ButtonRow } from './userCard.style';
import { CustomButton } from '../button/customButton';

export const UserCard = (
    {
        id, uid, first_name, last_name, email, avatar, registered, password,
        username, gender, phone_number, social_insurance_number, date_of_birth
    }
) => {
    const [editMode, setEditMode] = useState(false);
    const [updatedFirstName, setUpdatedFirstName] = useState();
    const [updatedLastName, setUpdatedLastName] = useState();
    const [updatedEmail, setUpdatedEmail] = useState();

    const deleteUser = async () => {
        try {
            await fetch(`http://localhost:3333/users/delete/${id}`, {
                method: "DELETE"
            });
        } catch (err) {
            console.error("Erro: ", err);
        }
    }

    const updateUser = async () => {
        try {
            const data = {
                id: id,
                uid: uid,
                password: password,
                first_name: updatedFirstName ?? first_name,
                last_name: updatedLastName ?? last_name,
                username: username,
                email: updatedEmail ?? email,
                avatar: avatar,
                gender: gender,
                phone_number: phone_number,
                social_insurance_number: social_insurance_number,
                date_of_birth: date_of_birth,
                register: true
            };
            await fetch(`http://localhost:3333/users/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            setEditMode(!editMode);
        } catch (err) {
            console.error("Erro: ", err);
        }
    }

    const handleFirstNameChange = (event) => {
        setUpdatedFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setUpdatedLastName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setUpdatedEmail(event.target.value);
    }

    return (
        <CardContainer>
            <Avatar src={avatar} alt="User avatar" />
            {editMode ?
                (
                    <UserInfo>
                        <label htmlFor="fname">First name:</label>
                        <input type="text" id="fname" name="fname" onChange={handleFirstNameChange} value={updatedFirstName}></input>
                        <label htmlFor="lname">Last name:</label>
                        <input type="text" id="lname" name="lname" onChange={handleLastNameChange} value={updatedLastName}></input>
                        <label htmlFor="email">E-mail:</label>
                        <input type="text" id="email" name="email" onChange={handleEmailChange} value={updatedEmail}></input>
                    </UserInfo>
                ) :
                (<UserInfo>
                    <span>Primeiro nome: {first_name}</span>
                    <span>Último nome: {last_name}</span>
                    <span>E-mail: {email}</span>
                </UserInfo>)
            }
            {registered ? (
                <ButtonRow>
                    <CustomButton
                        text={editMode ? "Enviar" : "Editar"}
                        color={editMode ? "#00FA9A" : "#FFFF00"}
                        onClick={editMode ? () => updateUser() : () => setEditMode(!editMode)}
                    />
                    <CustomButton
                        text="Deletar"
                        color={"#FF0000"}
                        onClick={() => deleteUser()}
                    />
                </ButtonRow>
            ) : null}
        </CardContainer>
    );
};

UserCard.propTypes = {
    id: PropTypes.number.isRequired,
    uid: PropTypes.string,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    registered: PropTypes.bool,
    password: PropTypes.string,
    username: PropTypes.string,
    gender: PropTypes.string,
    phone_number: PropTypes.string,
    social_insurance_number: PropTypes.number,
    date_of_birth: PropTypes.any
};

export default UserCard;
