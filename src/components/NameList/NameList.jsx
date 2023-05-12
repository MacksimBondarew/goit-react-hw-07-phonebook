import { ContactsList, ContactItem } from './NameList.styled';
import ContactName from '../ContactName/ContactName';
import { useSelector, useDispatch } from 'react-redux';
import { deleteNameContact } from '../../redux/state';
import { getContacts, getFilter } from '../../redux/selectors';

const NameList = () => {
    const filter = useSelector(getFilter);
    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();
    const getVisibleName = () => {
        const normalizedName = filter.trim().toLowerCase();
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedName)
        );
    };
    const deleteName = nameId => {
        dispatch(deleteNameContact(nameId));
    };
    return (
        <ContactsList>
            {getVisibleName().map(({ id, name, number }) => (
                <ContactItem key={id}>
                    <ContactName
                        id={id}
                        name={name}
                        number={number}
                        deleteName={deleteName}
                    />
                </ContactItem>
            ))}
        </ContactsList>
    );
};

export default NameList;
