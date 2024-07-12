import * as React from "react";
import styles from "./CollapsibleChatEmbedded.module.scss";
import type { ICollapsibleChatEmbeddedProps } from "./ICollapsibleChatEmbeddedProps";

interface ICollapsibleChatEmbeddedState {
    isOpen: boolean;
    animate: boolean;
}

export default class CollapsibleChatEmbedded extends React.Component<
    ICollapsibleChatEmbeddedProps,
    ICollapsibleChatEmbeddedState
> {
    state: ICollapsibleChatEmbeddedState = {
		// migrate away from this and create functional component using ICollapsibleChatEmbeddedProps instead
        // maybe later, for now, just use the default values
		isOpen: false,
        animate: false,
    };

    toggleChat = (): void => {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen,
            animate: !this.state.animate,
        }));
    };

    public render(): React.ReactElement<ICollapsibleChatEmbeddedProps> {
        const containerClass = `${styles.chatContainer} ${
            this.state.animate
                ? this.state.isOpen
                    ? styles.open
                    : styles.close
                : ""
        }`;
        return (
            <div className={containerClass}>
                <button onClick={this.toggleChat} className={styles.chatButton}>
                    {this.state.isOpen? " ❌ " : "💬 Ask Alfred: SOPs & Docs "}
                </button>
                    <iframe
                        src={`https://webchat.botframework.com/embed/ReeceChat?s=${process.env.CHAT_WEBPART_SECRET}`}
                        width="100%"
						className={styles.chatIframe} 
						style={{ display: this.state.isOpen ? "block" : "none" }}
                    />
            </div>
        );
    }
}