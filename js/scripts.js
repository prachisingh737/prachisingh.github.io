/*!
    Title: Portfolio Website
    Version: 1.3.0
    Last Change: 11/23/2024
    Author: Prachi Singh
    Repo:   (Add your GitHub repo link here)
    Issues: (Add your GitHub issues link here)

    Description: This file contains scripts associated with the portfolio website.
*/

(function($) {

    // Show current year in footer
    $("#current-year").text(new Date().getFullYear());

    // Remove no-js class for better UX
    $('html').removeClass('no-js');

    // Smooth scroll to section when nav is clicked
    $('header a').click(function(e) {
        // Skip links with no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var target = $(this).attr('href');
        var scrollDistance = $(target).offset().top;

        // Smooth scrolling effect
        $('html, body').animate({
            scrollTop: scrollDistance
        }, 700, 'swing'); // Adjust speed or easing if necessary

        // Close mobile menu on navigation
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Scroll to top button functionality
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 700); // Adjust scrolling speed
    });

    // Scroll to the next section on homepage
    $('#lead-down span').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance
        }, 700);
    });

    // Dynamic timeline creation for experience section
    $('#experience-timeline').each(function() {
        $this = $(this);
        $userContent = $this.children('div'); // Fetch user content

        // Add classes and wrap elements for timeline layout
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons for each timeline block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-briefcase"></i></div>'); // Customize icon if needed
        });

        // Add dates to the timeline blocks
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) {
                $(this).parent().prepend('<span class="vtimeline-date">' + date + '</span>');
            }
        });
    });

    // Open mobile menu functionality
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu functionality
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });

    // Show more projects dynamically
    $('#view-more-projects').click(function(e) {
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300); // Update project section
        });
    });

    // Highlight the current section in the navigation bar
    $(window).on('scroll', function() {
        var scrollPos = $(window).scrollTop();
        $('header a').each(function() {
            var section = $('#' + $(this).attr('href').split('#')[1]);
            if (section.position().top <= scrollPos && section.position().top + section.height() > scrollPos) {
                $('header a').removeClass('active');
                $(this).addClass('active');
            }
        });
    });

    //  About Section Fade-in (Intersection Observer)
const aboutSection = document.querySelector('#about');
const aboutText = document.querySelector('#about .col-md-8');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            aboutSection.classList.add('visible');
            observer.unobserve(aboutSection); //  Optimize: Only observe once
        }
    });
}, {
    threshold: 0.2 //  When 20% of the section is visible
});

observer.observe(aboutSection);

    //  Set --item-index variable for staggered animation
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index + 1);
    });

    //  Contact Form Validation
    $('#contact-form').submit(function(e) {
        e.preventDefault(); // Prevent default form submission

        const email = $('#email').val();
        const message = $('#message').val();
        const statusDiv = $('#form-status');

        statusDiv.text(''); // Clear previous status

        if (!email || !message) {
            statusDiv.text('Please fill in all fields.');
            return;
        }

        if (!isValidEmail(email)) {
            statusDiv.text('Invalid email format.');
            return;
        }

        // If validation passes, you would typically submit the form
        // using AJAX or allow the default form submission
        // For this example, we'll just show a success message:
        statusDiv.text('Form submitted successfully!');
        //  You can replace the above line with your actual submission logic
        //  (e.g., AJAX call to a server-side script)

        //  Example using AJAX (replace with your actual server-side endpoint)
        /*
        $.ajax({
            url: 'your-server-side-endpoint.php',
            type: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                statusDiv.text('Form submitted successfully!');
                $('#contact-form')[0].reset(); // Clear form
            },
            error: function() {
                statusDiv.text('An error occurred. Please try again.');
            }
        });
        */
    });

    //  Simple Email Validation Function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


})(jQuery);