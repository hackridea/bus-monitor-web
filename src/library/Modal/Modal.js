import React from "react";
import { IconButton } from "../";
import "./Modal.css";

function ActionModal(props) {
	let messagePadd = {};
	if (!!!props.actions) messagePadd = { paddingBottom: "30px" };
	let sizeclass = "";
	if (props.size) sizeclass = " modal-" + props.size;
	return (
		<div className="modal-backdrop">
			<div className={"modal-body" + sizeclass}>
				<div
					style={{
						position: "absolute",
						top: "0",
						right: "0"
					}}
					onClick={props.onClose}
				>
					<IconButton size="small">
						<i className="material-icons">close</i>
					</IconButton>
				</div>
				<div className="modal-header">{props.header}</div>
				<div className="modal-content">
					<div
						style={{
							padding: "0px 30px",
							...messagePadd
						}}
					>
						{props.children}
					</div>

					{!!props.actions && (
						<div
							style={{
								textAlign: "right",
								padding: "5px 10px"
							}}
						>
							{props.actions}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
export { ActionModal };
