<?php
require_once('./includes/meta.php');
?>
<div id="hero">
    <div>
        <?php
        echo file_get_contents("./images/logo-white.svg");
        echo file_get_contents("./images/logo-arrow.svg");
        ?>
    </div>
</div>
<div id="main">
    <header>
        <div class="logo-container">
            <?php echo file_get_contents("./images/logo.svg"); ?>
        </div>
        <div class="title">
            <div class="sub-heading">Coming Soon</div>
            <div class="heading">Get 20% OFF your online order.</div>
            <div class="main-footer-copy">
            Claim your discount by signing up for our beta testing phase.
            </div>
        </div>
    </header>
    <main>
        <div class="form-wrapper">
            <form action="" method="POST">

                <div class="input-wrapper">
                    <div class="input-group">
                        <div class="input-label">Email Address *</div>
                        <div class="input-field">
                            <input type="email" placeholder="example@domain.com" id="email" required />
                            <button id="submit-button">Notify Me</button>
                        </div>
                    </div>
                </div>

                <div id="form-feedback">&nbsp;</div>
            </form>
        </div>

        <div class="main-footer">
            <div class="main-footer-logos">
                <?php
                echo file_get_contents("./images/cafe.svg");
                echo file_get_contents("./images/sports.svg");
                echo file_get_contents("./images/garden.svg");
                ?>
            </div>
        </div>
    </main>
</div>