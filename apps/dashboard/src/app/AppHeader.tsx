// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CommandBar,
  ICommandBarItemProps,
  IContextualMenuItem
} from "office-ui-fabric-react";
import React from "react";

import { applications, IApplications } from "./applications";
import { IAppSetting } from "./IAppSetting";
import { languages } from "./languages";
import { themes } from "./themes";

export interface IAppHeaderProps extends Required<IAppSetting> {
  application: keyof IApplications;
  onSettingChanged<T extends keyof IAppSetting>(
    field: T,
    value: IAppSetting[T]
  ): void;
}

export class AppHeader extends React.Component<IAppHeaderProps> {
  private readonly onApplicationSelect = this.onSelect.bind(
    this,
    "application"
  );
  private readonly onVersionSelect = this.onSelect.bind(this, "version");
  private readonly onDatasetSelect = this.onSelect.bind(this, "dataset");
  private readonly onThemeSelect = this.onSelect.bind(this, "theme");
  private readonly onLanguageSelect = this.onSelect.bind(this, "language");

  public render(): React.ReactNode {
    const items: ICommandBarItemProps[] = [
      {
        key: "application",
        text: `Application - ${this.props.application}`,
        iconProps: {
          iconName: "AllApps"
        },
        subMenuProps: {
          items: this.getOptions(
            Object.keys(applications),
            this.onApplicationSelect
          )
        }
      },
      {
        key: "version",
        text: `Version - ${this.props.version}`,
        iconProps: {
          iconName: "NumberField"
        },
        subMenuProps: {
          items: this.getOptions(
            Object.keys(applications[this.props.application].versions),
            this.onVersionSelect
          )
        }
      },
      {
        key: "dataset",
        text: `Dataset - ${this.props.dataset}`,
        iconProps: {
          iconName: "Database"
        },
        subMenuProps: {
          items: this.getOptions(
            Object.keys(applications[this.props.application].datasets),
            this.onDatasetSelect
          )
        }
      },
      {
        key: "theme",
        text: `Theme - ${this.props.theme}`,
        iconProps: {
          iconName: "ColorSolid"
        },
        subMenuProps: {
          items: this.getOptions(Object.keys(themes), this.onThemeSelect)
        }
      },
      {
        key: "language",
        text: `Language - ${this.props.language}`,
        iconProps: {
          iconName: "PlainText"
        },
        subMenuProps: {
          items: this.getOptions(Object.keys(languages), this.onLanguageSelect)
        }
      }
    ];
    return <CommandBar items={items} id="TopMenuBar" />;
  }
  private getOptions(
    labels: readonly string[],
    onClick: (
      ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
      item?: IContextualMenuItem
    ) => boolean | void
  ): IContextualMenuItem[] {
    return labels.map((l) => ({
      text: l,
      key: l,
      data: l,
      onClick
    }));
  }

  private onSelect(
    field: keyof IAppSetting,
    _ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    item?: IContextualMenuItem
  ): boolean {
    if (item?.data) {
      this.props.onSettingChanged(field, item?.data);
    }
    return true;
  }
}