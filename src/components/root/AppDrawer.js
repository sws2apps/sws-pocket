import { Link } from 'react-router-dom';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ContactsIcon from '@mui/icons-material/Contacts';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';

const AppDrawer = () => {
    return ( 
        <div>
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                    <ListItemText primary={"Anjarako"} />
                </ListItem>
                <ListItem button component={Link} to="/MidweekMeeting">
                    <ListItemIcon><ViewWeekIcon /></ListItemIcon>
                    <ListItemText primary={"Fivoriana Andavanandro"} />
                </ListItem>
                <ListItem button component={Link} to="/AboutMe">
                    <ListItemIcon><ContactsIcon /></ListItemIcon>
                    <ListItemText primary={"Mombamomba Ahy"} />
                </ListItem>
            </List>
        </div>
    );
}
 
export default AppDrawer;