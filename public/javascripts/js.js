$(document).ready(function()
{

    var animate = {
      "crack":
      {
          "angle": -30,
          "image": "crack.png",
          "image_left": 110,
          "image_top": 55,
          "animate": 1,
          "duration": 500
      },
      "swing":
      {
          "angle": 135,
          "animate": 1,
          "duration": 750,
          "angle_attenuation": 0.75,
          "speed_attenuation": 0.7
      }
    };

    var static = {
      "crack":
      {
          "angle": -30,
          "image": "404.png",
          "image_left": 115,
          "image_top": 420,
          "animate": 0,
          "duration": 500
      },
      "swing":
      {
          "angle": 80,
          "animate": 0,
          "duration": 750,
          "angle_attenuation": 0.8,
          "speed_attenuation": 0.75
      }
    };

    var data = {
      'animated': animate,
      'static': static,
    }
    /* Check if browser is mobile */

    var window_width = (window.screen.width < window.outerWidth)? window.screen.width : window.outerWidth;
    var is_mobile = window_width < 768;

    /* If not mobile, run "broken" scripts */

    if(!is_mobile) {
        var type = ($('body').hasClass('broken-animated'))? 'animated' : 'static';

        if(type == 'static')
        {
            $('#error').hide();
        }

        $('.broken-swing').breakIt('swing', data[type]);
        $('.broken-crack').breakIt('crack', data[type]);
    }
});
