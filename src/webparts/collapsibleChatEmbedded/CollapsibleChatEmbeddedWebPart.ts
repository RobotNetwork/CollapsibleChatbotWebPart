import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
    type IPropertyPaneConfiguration,
    PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import * as strings from "CollapsibleChatEmbeddedWebPartStrings";
import CollapsibleChatEmbedded from "./components/CollapsibleChatEmbedded";
import type { ICollapsibleChatEmbeddedProps } from "./components/ICollapsibleChatEmbeddedProps";
// export interface ICollapsibleChatEmbeddedWebPartProps {
//     animate: boolean;
//     isOpen: boolean;
// }

export default class CollapsibleChatEmbeddedWebPart extends BaseClientSideWebPart<ICollapsibleChatEmbeddedProps> {
    public render(): void {
        const element: React.ReactElement<ICollapsibleChatEmbeddedProps> =
            React.createElement(CollapsibleChatEmbedded, {
                isOpen: this.properties.isOpen,
                animate: this.properties.animate,
            });

        ReactDom.render(element, this.domElement);
    }

    protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
        if (!currentTheme) {
            return;
        }

        const { semanticColors } = currentTheme;

        if (semanticColors) {
            this.domElement.style.setProperty(
                "--bodyText",
                semanticColors.bodyText || null
            );
            this.domElement.style.setProperty(
                "--link",
                semanticColors.link || null
            );
            this.domElement.style.setProperty(
                "--linkHovered",
                semanticColors.linkHovered || null
            );
        }
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse("1.0");
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription,
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField("description", {
                                    label: strings.DescriptionFieldLabel,
                                }),
                            ],
                        },
                    ],
                },
            ],
        };
    }
}