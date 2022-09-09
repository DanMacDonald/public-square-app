import React, { useEffect } from 'react';
import "./profileButton.css";
import { account } from '../lib/api';

export const ProfileButton = (props) => {
	const [name, setName] = React.useState("");
	const [handle, setHandle] = React.useState("");
	const [src, setSrc] = React.useState("");

	React.useEffect(() => {
		if (props.isWalletConnected) {
			const getAccount = async () => {
				const activeAddress = await window.arweaveWallet.getActiveAddress();
				const info = await account.get(activeAddress);
				if (info.txid != null) {
					setName(info.profile.name);
					setHandle(info.handle);
					setSrc(info.profile.avatarURL);
				} else {
					setName(info.handle);
					setHandle("edit account");
					setSrc("img_avatar.png");
				}
			};

			getAccount();
		} else {
			setName("");
			setHandle("");
			setSrc("");
		}
	}, [props.isWalletConnected]);

	if (!src || src.length == 0) {
		return <></>
	} else {

		function onEditProfile() {
			window.open("https://account.metaweave.xyz", '_blank');
		}

		return (
			<button className="profileButton" onClick={onEditProfile}>
				<div className="content">
					<img className="profileImage" src={src} alt="profile icon" />
					<div className="names">
						<p>{name}</p>
						{handle}
					</div>
					<div className="ellipse">
						...
					</div>
				</div>
			</button>)
	}
}