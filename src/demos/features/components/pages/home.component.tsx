import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';


@CustomElement('app-home')
export class HomeComponent extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        <header class='masthead'>
          <div class='container d-flex h-100 align-items-center'>
            <div class='mx-auto text-center'>
              <h1 class='mx-auto my-0 text-uppercase'>@nyaf</h1>
              <h2 class='text-white-50 mx-auto mt-2 mb-5'>A free, simple, sleek and fast framework.</h2>
              <a class='btn btn-primary js-scroll-trigger' href='#down'>Get Started</a>
            </div>
          </div>
        </header>
        <section class='start-section' id='down'>
          <div class='container'>
            <div class='row'>
              <div class='col-lg-8 mx-auto'>
                <h2 class='text-white mb-4 text-center'>Technologically Enhanced Web Components</h2>
                <p class='text-white-50'>
                  It follows a philosophie that got somehow lost in past years &ndash; instead of adding more an more functions to a frontend framework, it's
                  much better to extend th e developer's toolchain and try to keep the result as simple as possible, using native functions wherever possible.
                  <br></br>
                  The tooling of @nyaf has three main ingredients:
                  </p>
                <ol class='text-white-50'>
                    <li>Using TypeScript is mandatory (it's actually written in TypeScript)</li>
                    <li>Using JSX/TSX is the preferred way to create components</li>
                    <li>Using decorators for following the "separation of concerns" principle</li>
                  </ol>
                  <p  class='text-white-50'>The result is outstanding. Very easy to write components, very small code, very fast execution.</p>
                <blockquote>
                    The core library is actually <b>36 KB</b>, zipped roughly <b>11 KB</b>.
                  </blockquote>
              </div>
            </div>
            <img class='img-fluid' src='assets/img/ipad.png' alt='' />
          </div>
        </section>
        <section class='projects-section bg-light' id='projects'>
          <div class='container'>
            <div class='row align-items-center no-gutters mb-4 mb-lg-5'>
              <div class='col-xl-8 col-lg-7'><img class='img-fluid mb-3 mb-lg-0' src='assets/img/bg-masthead.jpg' alt='' /></div>
              <div class='col-xl-4 col-lg-5'>
                <div class='featured-text text-center text-lg-left'>
                  <h4>Shoreline</h4>
                  <p class='text-black-50 mb-0'>
                    @nyaf is open source and MIT licensed. FOSS free licensing for enterprises on request.
                    This means you can use it for any project - even commercial projects! Download it, customize it, and publish your website!
                    </p>
                  <p class='text-black-50 mb-0'>There is full support for</p>
                  <ul class='text-black-50 mb-0'>
                    <li>WebPack</li>
                    <li>TypeScript</li>
                    <li>HTML 5 DOM API</li>
                  </ul>
                  <p class='text-black-50 mb-0'>
                    No vendor lock-in, no special tooling, no editor enhancements. Pure modern Web Technology made right, finally.
                    </p>
                  <p class='text-black-50 mb-0'>
                    There is no dependency to anything, too.
                    </p>
                </div>
              </div>
            </div>
            <div class='row justify-content-center no-gutters mb-5 mb-lg-0'>
              <div class='col-lg-6'><img class='img-fluid' src='assets/img/demo-image-01.jpg' alt='' /></div>
              <div class='col-lg-6'>
                <div class='bg-black text-center h-100 project'>
                  <div class='d-flex h-100'>
                    <div class='project-text w-100 my-auto text-center text-lg-left'>
                      <h4 class='text-white'>Enhanced Template Features</h4>
                      <p class='text-black-50 mb-0'>Template are powerful und can handle special instruction, it's a bit looking like Vue.</p>
                      <p class='text-black-50 mb-0'>
                        Templates are written in JSX, and this part looks much like React. However, state and attribute management is put together and hence much
                        easier to handle than in React.
        </p>
                      <p>
                        Components <i>can</i> us a shadow DOM. This is an option, not enforced. It's just a decorator and it's a "per component" decision.
        </p>
                      <p class='text-black-50 mb-0'>Decorators handle all definitions, and this is looking a lot like Angular.</p>
                      <hr class='d-none d-lg-block mb-0 ml-0' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class='row justify-content-center no-gutters'>
              <div class='col-lg-6'><img class='img-fluid' src='assets/img/demo-image-02.jpg' alt='' /></div>
              <div class='col-lg-6 order-lg-first'>
                <div class='bg-black text-center h-100 project'>
                  <div class='d-flex h-100'>
                    <div class='project-text w-100 my-auto text-center text-lg-right'>
                      <h4 class='text-white'>Best Bread</h4>
                      <p class='mb-0 text-white-50'>
                        <h3>Best Bread</h3>
                        <p class='text-black-50 mb-0'>
                          @nyaf takes the best from everything and strips all parts that a browser can handle natively. Especially there is <strong>no</strong>...:
        </p>
                        <ul class='text-black-50 mb-0'>
                          <li>
                            ...AJAX/HTTP module. Use <code>fetch</code> instead.
          </li>
                          <li>...Animation module. Use CSS 3 animation.</li>
                          <li>...Dependency Injection. Use TypeScript's capabilities to deal with services; there is a simple service manager included.</li>
                        </ul>
                      </p>
                      <hr class='d-none d-lg-block mb-0 mr-0' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class='signup-section' id='signup'>
          <div class='container'>
            <div class='row'>
              <div class='col-md-10 col-lg-8 mx-auto text-center'>
                <i class='far fa-paper-plane fa-2x mb-2 text-white'></i>
                <h2 class='text-white mb-5'>Subscribe to receive updates!</h2>
                <form class='form-inline d-flex'>
                  <input class='form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0' id='inputEmail' type='email' placeholder='Enter email address...' />
                  <button class='btn btn-primary mx-auto' type='submit'>Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section class='contact-section bg-black'>
          <div class='container'>
            <div class='row'>
              <div class='col-md-4 mb-3 mb-md-0'>
                <div class='card py-4 h-100'>
                  <div class='card-body text-center'>
                    <i class='fas fa-map-marked-alt text-primary mb-2'></i>
                    <h4 class='text-uppercase m-0'>Source Code</h4>
                    <hr class='my-4' />
                    <div class='small text-black-50'>github.com/joergkrause/nyaf</div>
                  </div>
                </div>
              </div>
              <div class='col-md-4 mb-3 mb-md-0'>
                <div class='card py-4 h-100'>
                  <div class='card-body text-center'>
                    <i class='fas fa-envelope text-primary mb-2'></i>
                    <h4 class='text-uppercase m-0'>Enterprise Inquiries</h4>
                    <hr class='my-4' />
                    <div class='small text-black-50'><a href='#!'>joerg@krause.net</a></div>
                  </div>
                </div>
              </div>
              <div class='col-md-4 mb-3 mb-md-0'>
                <div class='card py-4 h-100'>
                  <div class='card-body text-center'>
                    <i class='fas fa-mobile-alt text-primary mb-2'></i>
                    <h4 class='text-uppercase m-0'>Support</h4>
                    <hr class='my-4' />
                    <div class='small text-black-50'>We recommend Stack Overflow</div>
                  </div>
                </div>
              </div>
            </div>
            <div class='social d-flex justify-content-center'>
              <a class='mx-2' href='#!'><i class='fab fa-twitter'></i></a>
              <a class='mx-2' href='#!'><i class='fab fa-facebook-f'></i></a>
              <a class='mx-2' href='#!'><i class='fab fa-github'></i></a>
            </div>
          </div>
        </section>
      </>
    );
  }
}
