class Slider extends React.Component {
    constructor() {
        super()
        this.scroll = this.scroll.bind(this)
    }


    scroll(direction) {
        let far = $('.image-container').width() / 2 * direction;
        let pos = $('.image-container').scrollLeft() + far;
        $('.image-container').animate({ scrollLeft: pos }, 1000)
    }

    render() {
        return <div className="main">
            <h1 className="title">Scrolling Image Slider</h1>
            <div className="wrapper">
                <a className="prev" onClick={this.scroll.bind(null, -1)}>&#10094;</a>
                <div className="image-container">
                    <div className="image">1</div>
                    <div className="image">2</div>
                    <div className="image">3</div>
                    <div className="image">4</div>
                    <div className="image">5</div>
                    <div className="image">6</div>
                    <div className="image">7</div>
                    <div className="image">8</div>
                    <div className="image">9</div>
                    <div className="image">10</div>
                </div>
                <a className="next" onClick={this.scroll.bind(null, 1)}>&#10095;</a>
            </div>
        </div>;
    }
}

React.render(<Application />, document.getElementById('image_slider'));