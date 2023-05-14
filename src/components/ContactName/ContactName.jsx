import { deleteContact } from 'redux/operations';
import {
    ContactNameSpan,
    ContactNumberSpan,
    RemoveContact,
} from '../NameList/NameList.styled';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

const ContactName = ({ id, name, number }) => {
    const dispatch = useDispatch();
    const deleteName = nameId => {
        dispatch(deleteContact(nameId));
    };
    return (
        <>
            <ContactNameSpan>{name}</ContactNameSpan>
            <ContactNumberSpan>{number}</ContactNumberSpan>
            <RemoveContact type="button" onClick={() => deleteName(id)}>
                Видалити
            </RemoveContact>
        </>
    );
};
ContactName.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
};

export default ContactName;
