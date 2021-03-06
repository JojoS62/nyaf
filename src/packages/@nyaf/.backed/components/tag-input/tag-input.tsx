import JSX, { CustomElement, Properties, Events, BaseComponent } from '@nyaf/lib';
require('./tag-input.scss');

const inputChangeEvents = 'change input propertychange cut paste copy drop'.split(' ');

@CustomElement('ui-taginput')
@Properties<TagInputProps>({
  staticMode: false,
  tags: [],
  maxTags: 0,
  tagTrigger: [13, 188],
  clsTag: '',
  clsTagTitle: '',
  clsTagRemover: ''
})
@Events([
  'change',
  'blur',
  'focus'
])
export class TagInput extends BaseComponent<TagInputProps> {
  constructor() {
    super();
    this.state = {
      tags: [].concat(props.tags),
      initValue: props.tags.join(','),
      staticMode: props.staticMode
    };
    this.component = React.createRef();
    this.input = React.createRef();
    this.tagClickHandler = this.tagClickHandler.bind(this);
    this.onChange = this.onChange.bind(this);
    this.inputKeyUp = this.inputKeyUp.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.tags.join(',') !== state.initValue || props.staticMode !== state.staticMode) {
      return {
        tags: [].concat(props.tags),
        initValue: props.tags.join(','),
        staticMode: props.staticMode
      };
    }
    return null;
  }

  onChange(tags) {
    this.props.onChange(tags);
  }

  inputKeyUp(e) {
    const input = e.target;
    const { tagTrigger } = this.props;
    let val = input.value.trim();
    const { tags } = this.state;

    if (val === '') {
      return;
    }
    if (tagTrigger.indexOf(e.keyCode) === -1) {
      return;
    }

    // TODO replace "," to tagTrigger
    val = val.replace(',', '');

    tags.push(val);
    input.value = '';
    this.setState({
      tags: tags
    });

    this.onChange(tags);
  }

  inputChange() {
    const input = this.input.current;
    input.setAttribute('size', Math.ceil(input.value.length / 2) + 2);
  }

  onFocus(e) {
    this.setState({
      focus: true
    });
    this.props.onFocus(e);
  }

  onBlur(e) {
    this.setState({
      focus: false
    });
    this.props.onBlur(e);
  }

  onClick() {
    this.input.current.focus();
  }

  tagClickHandler(index) {
    return e => {

      if (!e.target.classList.contains('remover')) {
        return false;
      }
      const { tags } = this.state;
      tags.splice(index, 1);

      this.setState({ tags });

      this.onChange(tags);

      e.preventDefault();
      e.stopPropagation();
    };
  }

  componentDidMount() {
    const input = this.input.current;
    const component = this.component.current;

    component.addEventListener('click', this.onClick);

    input.addEventListener('keyup', this.inputKeyUp);
    input.addEventListener('focus', this.onFocus);
    input.addEventListener('blur', this.onBlur);

    inputChangeEvents.forEach(ev => {
      input.addEventListener(ev, this.inputChange);
    });
  }

  componentWillUnmount() {
    const input = this.input.current;
    const component = this.component.current;

    component.removeEventListener('click', this.onClick);

    input.removeEventListener('keyup', this.inputKeyUp);
    input.removeEventListener('focus', this.onFocus);
    input.removeEventListener('blur', this.onBlur);

    inputChangeEvents.forEach(ev => {
      input.removeEventListener(ev, this.inputChange);
    });
  }

  async render() {
    const { staticMode: initialStatic, tags: propsTags, maxTags, tagTrigger, clsTag, clsTagTitle, clsTagRemover, ...inputProps } = this.data;
    const { staticMode, tags, focus } = this.state;

    return (
      <div className={`tag-input ${focus ? 'focused' : ''} ${staticMode ? 'static-mode' : ''}`} ref={this.component}>
        {tags.map((tag, index) => {
          return (
            <Tag
              cls={clsTag}
              clsTitle={clsTagTitle}
              clsRemover={clsTagRemover}
              key={index}
              onClick={this.tagClickHandler(index)}
            >
              {tag}
            </Tag>
          );
        })}
        <input type='text' className={`input-wrapper`} ref={this.input} size={1} />
      </div>
    );
  }
}

interface TagInputProps {
  staticMode: boolean;
  tags: [];
  maxTags: number;
  tagTrigger: number[];
  clsTag: string;
  clsTagTitle: string;
  clsTagRemover: string;
}
