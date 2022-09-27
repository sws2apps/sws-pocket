import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { dbGetAppSettings } from '../indexedDb/appSettings';

const MyAccount = () => {
	const { t } = useTranslation();

	const [myName, setMyName] = useState('');
	const [pocketMembers, setPocketMembers] = useState([]);

	useEffect(() => {
		const getAppSettings = async () => {
			const { username, pocket_members } = await dbGetAppSettings();

			setMyName(username);
			setPocketMembers(pocket_members);
		};

		getAppSettings();
	}, []);

	return (
		<Container>
			<Box sx={{ marginBottom: '20px' }}>
				<Typography sx={{ fontWeight: 'bold' }}>
					{t('myAccount').toUpperCase()}
				</Typography>
			</Box>
			<Box>
				<TextField
					label={t('myName')}
					variant='outlined'
					size='small'
					autoComplete='off'
					value={myName}
					sx={{ width: '290px' }}
					InputProps={{
						readOnly: true,
					}}
				/>
				<List sx={{ marginTop: '15px' }}>
					<Typography sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
						{t('viewScheduleOnBehalf')}
					</Typography>
					{pocketMembers.length > 0 &&
						pocketMembers.map((member) => (
							<ListItem
								key={member.person_uid}
								sx={{ padding: 0, margin: '0 0 0 10px' }}
							>
								<ListItemText primary={member.person_name} />
							</ListItem>
						))}
				</List>
			</Box>
			<Box>
				<Typography sx={{ fontSize: '13px', fontStyle: 'italic' }}>
					{t('myAccountNote')}
				</Typography>
			</Box>
		</Container>
	);
};

export default MyAccount;
