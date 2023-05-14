import { ContactsList, ContactItem, Error } from './NameList.styled';
import ContactName from '../ContactName/ContactName';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectContacts,
    selectFilter,
    selectLoading,
    selectError,
} from '../../redux/selectors';
import { useEffect } from 'react';
import { featchContacts } from '../../redux/operations';
import { DotLoader } from 'react-spinners';

const NameList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(featchContacts());
    }, [dispatch]);
    const filter = useSelector(selectFilter);
    const contacts = useSelector(selectContacts);
    const error = useSelector(selectError);
    const loading = useSelector(selectLoading);

    const getVisibleName = () => {
        const normalizedName = filter.trim().toLowerCase();
        const filterContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedName)
        );
        return [...filterContacts].sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name)
        );
    };
    return (
        <>
            {loading && (
                <>
                    <DotLoader
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            zIndex: '999',
                        }}
                        color="#3682d6"
                        cssOverride={{}}
                        loading
                        size={50}
                    />
                </>
            )}
            {error ? (
                <>
                    <Error>
                        Sorry, an error occurred while loading this page. Please
                        try again later
                    </Error>
                </>
            ) : (
                <>
                    <ContactsList>
                        {getVisibleName().map(({ id, name, number }) => (
                            <ContactItem key={id}>
                                <ContactName
                                    id={id}
                                    name={name}
                                    number={number}
                                />
                            </ContactItem>
                        ))}
                    </ContactsList>
                </>
            )}
        </>
    );
};

export default NameList;
