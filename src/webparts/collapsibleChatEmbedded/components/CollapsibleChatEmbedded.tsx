import * as React from "react";
import styles from "./CollapsibleChatEmbedded.module.scss";
import type { ICollapsibleChatEmbeddedProps } from "./ICollapsibleChatEmbeddedProps";
import Teams from "../../../svgs/Teams";
import Tooltip from "@mui/material/Tooltip";
import { IoClose } from "react-icons/io5";

interface ICollapsibleChatEmbeddedState {
    isOpen: boolean;
    animate: boolean;
}

export default class CollapsibleChatEmbedded extends React.Component<
    ICollapsibleChatEmbeddedProps,
    ICollapsibleChatEmbeddedState
> {
    state: ICollapsibleChatEmbeddedState = {
        // migrate away from this
        isOpen: false,
        animate: false,
    };

    toggleChat = (): void => {
        this.setState(
            (prevState) => ({
                isOpen: !prevState.isOpen,
                animate: !prevState.animate,
            })
        );
    };

    doNothing = (): void => {
        return;
    };

    openInTeams = (): void => {
        window.open("https://teams.microsoft.com/l/chat/0/0?users=28:709c31a7-d9f5-46d0-98a9-9abd200ff5aa");
    }

    public render(): React.ReactElement<ICollapsibleChatEmbeddedProps> {
        const containerClass = `${styles.chatContainer} ${
            this.state.animate
                ? this.state.isOpen
                    ? styles.open
                    : styles.close
                : ""
        }`;
        return (
            <div
                className={containerClass}
                style={{
                    translate: this.state.isOpen ? "0" : "0px 17px",
                    width: this.state.isOpen ? "450px" : "250px",
                }}
            >
                <div
                    className={`${styles.chatButton} ${this.state.isOpen ? styles.open : styles.closed}`}
                    onClick={!this.state.isOpen ? this.toggleChat : this.doNothing}
                    style={{cursor: this.state.isOpen ? "default" : "pointer",}}
                >
                    <span
                        className={styles.chatLabel}
                        style={{cursor: this.state.isOpen ? "default" : "pointer"}}>
                    Ask Alfred
                    </span>
                    {this.state.isOpen && (
                        <Tooltip title="Open in Teams" placement="top"> 
                        <span
                            className={styles.closeButton}
                            onClick={this.openInTeams}>
                            <Teams/>
                        </span>
                        </Tooltip>
                    )}
                    {this.state.isOpen && (
                        <Tooltip title="Close Chat" placement="top">
                        <span
                            className={styles.closeButton}
                            onClick={this.toggleChat}>
                            <IoClose />
                        </span>
                        </Tooltip> 
                    )} 
                </div>
                <iframe
                    // src={`https://webchat.botframework.com/embed/ReeceChat?s=${process.env.CHAT_WEBPART_SECRET}`}
                    src={
                        "https://webchat.botframework.com/embed/ReeceChat?s=A29JyzJxtpE.hT5CtuUMaFATWQGWh2Pbo_ATW1w65oGJp8-htAgcNug"
                    }
                    width="inherit"
                    className={styles.chatIframe}
                    style={{
                        // display: this.state.isOpen ? "block" : "none",
                        height: this.state.isOpen ? "500px" : "0px",
                    }}
                />
            </div>
        );
    }
}