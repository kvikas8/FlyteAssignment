import React, { Component } from 'react'
import { ViewProps } from '.'
import { ImageNames } from '../../config/imageName'
import { ActionListView, ListContent } from './actionList.view'

interface Props extends Partial<ViewProps> {
    onPressActionListItem?: () => void
}

interface State {}

export class ActionList<P_ extends Props = Props, S_ extends State = State> extends Component<P_, S_> {
    public render() {
        return (
            <ActionListView
                content={this.getContent()}
                onPressListItem={this.props.onPressActionListItem}
                {...(this.props as P_)}
            />
        )
    }

    protected getContent = (): ListContent[] => {
        // TODO: This should come from some string file if its a static text, Hardcoded here for time limits
        return [
            { imageName: ImageNames.TRANSFER_ICON, title: 'Transfer Cash', subtitle: 'Add and withdraw cash' },
            {
                imageName: ImageNames.SAVE_ICON,
                title: 'Save for something new',
                subtitle: 'Save and invest towards something in future',
            },
            {
                imageName: ImageNames.INVITE_ICON,
                title: 'Invite Cameron',
                subtitle: 'Give Cameron access to login to their account',
            },
            {
                imageName: ImageNames.SHARE_ICON,
                title: 'Share profile link',
                subtitle: 'Others can signup and contribute to this account',
            },
            {
                imageName: ImageNames.SHARE_ICON,
                title: 'Settings and Account Documents',
                subtitle: 'View and change settings. Access monthly statements, trade confirms and text docs',
            },
            {
                imageName: ImageNames.DELETE_ICON,
                title: 'Delete Account',
                subtitle: 'Remove an account that is not in use',
            },
        ]
    }
}
