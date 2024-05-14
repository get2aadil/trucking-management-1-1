import React from 'react';

class CustomToolbar extends React.Component {
    render() {
        const { localizer: { messages }, label } = this.props;

        return (
            <div className="rbc-toolbar">
                <span className="rbc-btn-group" style={{ margin: '5px' }}>
                    <button type="button" onClick={() => this.navigate('TODAY')}>
                        {messages.today}
                    </button>
                    <button type="button" onClick={() => this.navigate('PREV')}>
                        {messages.previous}
                    </button>
                    <button type="button" onClick={() => this.navigate('NEXT')}>
                        {messages.next}
                    </button>
                </span>
                <span className="rbc-toolbar-label" style={{ margin: '5px' }}>
                    {label}
                </span>
                <span className="rbc-btn-group" style={{ margin: '5px' }}>
                    <button type="button" onClick={() => this.view('month')}>
                        {messages.month}
                    </button>
                    <button type="button" style={{marginRight: '50px'}}onClick={() => this.view('week')}>
                        {messages.week}
                    </button>
                </span>
            </div>
        );
    }

    navigate = (action) => {
        this.props.onNavigate(action);
    }

    view = (view) => {
        this.props.onView(view);
    }
}

export default CustomToolbar;
