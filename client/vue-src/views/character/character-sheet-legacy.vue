<template>
  <div id="main-container">
    <div id="main-top">
      <header>
        <div class="container-fluid pl-0">
          <div
            class="header d-md-flex justify-content-between align-items-center pt-1 pl-1 pr-5"
          >
            <div>
              <a href="/"
                ><img
                  src="/images/logo.png"
                  style="height: 50px"
                  alt="Wanderer's Guide"
              /></a>
              <sup
                class="is-inline has-txt-value-number is-size-6-5 font-bebas-neue text-overflow-none is-hidden-mobile"
                >Beta 1.9.3</sup
              >
            </div>

            <div>
              <nav>
                <a class="icon is-medium nav-menu-toggle">
                  <i class="fa fa-2x fa-bars"></i>
                </a>
                <div id="mobile-nav-menu-container"></div>

                <ul class="nav-menu pt-1">
                  <li><a href="/">Home</a></li>

                  <template v-if="user">
                    <li class="mx-lg-4 mx-md-3 my-md-0 my-2">
                      <a href="/v/profile/characters" class="active"
                        >Characters</a
                      >
                    </li>
                  </template>
                  <template v-else>
                    <span class="ml-lg-4 ml-md-3"></span>
                  </template>

                  <li><a href="/builds">Builds</a></li>

                  <li class="mx-lg-4 mx-md-3 my-md-0 my-2">
                    <a href="/homebrew">Homebrew</a>
                  </li>

                  <li><a href="/gm-tools">GM Tools</a></li>

                  <li class="mx-lg-4 mx-md-3 my-md-0 my-2">
                    <a href="/browse"><i class="fas fa-lg fa-search"></i></a>
                  </li>

                  <template v-if="user">
                    <li class="mr-4">
                      <a href="#" id="nav-profile-picture">
                        <object
                          class="profile-header-icon"
                          data="{{user.thumbnail}}"
                          type="image/png"
                        >
                          <img
                            class="profile-header-icon"
                            src="/images/fb_profile_pic.png"
                            alt="Profile Image"
                          />
                        </object>
                      </a>
                      <ul>
                        <li>
                          <a href="/profile" class="drop-text"
                            ><i class="fas fa-user-circle"></i>
                            Account
                          </a>
                        </li>
                        <template v-if="user.isAdmin == 1">
                          <li>
                            <a href="/admin/panel" class="drop-text"
                              ><i class="fas fa-tools"></i>
                              Admin Panel
                            </a>
                          </li></template
                        >
                        <li>
                          <a
                            href="https://discord.gg/kxCpa6G"
                            target="_blank"
                            class="drop-text"
                            ><i class="fab fa-discord"></i> Discord<sup
                              class="icon is-small"
                              ><i
                                class="fas fa-xs fa-external-link-alt"
                              ></i></sup
                          ></a>
                        </li>
                        <li>
                          <a
                            href="https://www.patreon.com/wanderersguide"
                            target="_blank"
                            class="drop-text"
                            ><i class="fab fa-patreon"></i> Patreon<sup
                              class="icon is-small"
                              ><i
                                class="fas fa-xs fa-external-link-alt"
                              ></i></sup
                          ></a>
                        </li>
                        <li>
                          <a href="/api_docs" class="drop-text"
                            ><i class="fas fa-cog"></i>
                            API Docs
                          </a>
                        </li>
                        <li>
                          <a href="/license" class="drop-text"
                            ><i class="fas fa-scroll"></i>
                            License
                          </a>
                        </li>
                        <li>
                          <a href="/auth/logout" class="drop-text"
                            ><i class="fas fa-sign-out-alt"></i>
                            Logout
                          </a>
                        </li>
                      </ul>
                    </li>
                  </template>
                  <template v-else>
                    <li class="mr-4">
                      <a href="/auth/login"
                        >Login <i class="fas fa-sign-in-alt"></i
                      ></a>
                    </li>
                  </template>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div class="banner_w3lspvt-2"></div>
    </div>

    <div class="top-border"></div>

    <div id="center-body">
      <div class="sticky_buttons_shell sticky_button_leftest">
        <span
          class="icon is-small has-text-info cursor-clickable sticky_button is-upper has-tooltip-right"
          data-tooltip="Open Sheet Tools"
          id="leftQuickviewButton"
        >
          <i class="fas fa-2x fa-angle-right"></i>
        </span>
      </div>

      <section
        id="character-sheet-section"
        class="section is-paddingless px-4 py-3 text-center"
      >
        <div id="errorDisplay" class="hero is-danger is-hidden">
          <div class="hero-body is-paddingless py-3">
            <div id="errorMessage" class="container"></div>
          </div>
        </div>

        <span
          id="warnings-icon"
          class="is-hidden icon has-text-warning pos-absolute pos-t-5 pos-r-5 cursor-clickable has-tooltip-left"
          data-tooltip="Warnings"
          ><i class="fas fa-exclamation-triangle"></i
        ></span>

        <div id="sheet-container" class="tile is-ancestor is-vertical">
          <div class="tile is-vertical m-2">
            <div class="tile is-parent is-paddingless">
              <div class="tile is-3">
                <div class="mobile-box tile mb-4 mr-2">
                  <div class="tile sheet-box">
                    <div
                      id="charInfoContent"
                      class="tile is-vertical is-7 cursor-clickable pb-1"
                    >
                      <p
                        id="character-name"
                        class="is-size-5 has-txt-value-string is-clipped"
                      ></p>
                      <div class="tile is-child">
                        <p
                          id="character-type"
                          class="is-size-7 has-txt-listing"
                        ></p>
                      </div>
                    </div>
                    <div
                      id="charExperienceContent"
                      class="tile is-vertical is-5 pb-1"
                    >
                      <p
                        id="character-level"
                        class="is-size-6 has-txt-value-number"
                      ></p>
                      <div class="tile is-child pb-3">
                        <p
                          class="is-size-7 has-txt-listing has-text-weight-semibold"
                        >
                          Experience
                        </p>
                        <div class="field px-4">
                          <p class="control">
                            <input
                              id="exp-input"
                              class="input is-small"
                              type="number"
                              value=""
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tile is-3">
                <div class="mobile-box tile is-vertical sheet-box mx-4 mb-4">
                  <div class="tile pb-1" style="position: relative">
                    <div
                      id="healthPointsContainer"
                      class="tile is-child px-2 pt-2"
                    >
                      <p class="is-size-6">
                        <strong class="has-txt-value-number">Hit Points</strong>
                      </p>
                      <div class="columns is-mobile is-centered">
                        <div class="column is-narrow is-paddingless py-2">
                          <div
                            id="char-current-health"
                            class="cursor-clickable"
                          ></div>
                        </div>
                        <div class="column is-narrow is-paddingless py-2">
                          <p class="is-size-5 has-txt-noted text-center">/</p>
                        </div>
                        <div
                          class="column is-narrow is-paddingless py-2"
                          style="width: 70px"
                        >
                          <p
                            id="char-max-health"
                            class="is-size-5 has-txt-value-string text-center"
                          ></p>
                        </div>
                      </div>
                    </div>
                    <div id="tempPointsContainer" class="tile is-child pt-3">
                      <p class="is-size-7">
                        <strong class="has-txt-listing">Temp. HP</strong>
                      </p>
                      <div class="columns is-centered">
                        <div class="column is-narrow is-paddingless py-2">
                          <div
                            id="char-temp-health"
                            class="cursor-clickable"
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div
                      id="staminaPointsContainer"
                      class="tile is-child is-hidden px-2 pt-2"
                    >
                      <p class="is-size-6">
                        <strong class="has-txt-value-number">Stamina</strong>
                      </p>
                      <div class="columns is-mobile is-centered">
                        <div class="column is-narrow is-paddingless py-2">
                          <div
                            id="char-current-stamina"
                            class="cursor-clickable"
                          ></div>
                        </div>
                        <div class="column is-narrow is-paddingless py-2">
                          <p class="is-size-5 has-txt-noted text-center">/</p>
                        </div>
                        <div
                          class="column is-narrow is-paddingless py-2"
                          style="width: 40px"
                        >
                          <p
                            id="char-max-stamina"
                            class="is-size-5 has-txt-value-string text-center"
                          ></p>
                        </div>
                      </div>
                    </div>
                    <div
                      id="resolvePointsContainer"
                      class="tile is-child is-hidden pt-3"
                    >
                      <p class="is-size-7">
                        <strong class="has-txt-listing">Resolve</strong>
                      </p>
                      <div class="columns is-mobile is-centered">
                        <div class="column is-narrow is-paddingless py-2">
                          <div
                            id="char-current-resolve"
                            class="cursor-clickable"
                          ></div>
                        </div>
                        <div class="column is-narrow is-paddingless py-2">
                          <p class="is-size-5 has-txt-noted text-center">/</p>
                        </div>
                        <div
                          class="column is-narrow is-paddingless py-2"
                          style="width: 40px"
                        >
                          <p
                            id="char-max-resolve"
                            class="is-size-5 has-txt-value-string text-center"
                          ></p>
                        </div>
                      </div>
                    </div>

                    <div
                      id="pointSwitchOutContainer"
                      class="is-hidden"
                      style="position: absolute; top: 5px; left: 50%"
                    >
                      <span
                        id="pointSwitchOutBtn"
                        class="icon is-small has-text-info cursor-clickable"
                        ><i class="fas fa-lg fa-retweet"></i
                      ></span>
                    </div>
                  </div>
                  <div class="tile" style="position: relative">
                    <div
                      id="resistAndVulnerContent"
                      class="tile is-child cursor-clickable"
                    >
                      <p id="resistAndVulnerText" class="text-center"></p>
                    </div>
                    <span
                      id="resistAndVulnerViewAllBtn"
                      class="icon is-small has-text-info cursor-clickable"
                      style="position: absolute; bottom: 7px; right: 7px"
                    >
                      <i class="fas fa-fire"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="tile is-3">
                <div
                  class="mobile-box tile mobile-is-marginless sheet-box ml-1 mr-4 mb-4"
                >
                  <div
                    class="tile is-child use-custom-scrollbar"
                    style="max-height: 100px; overflow-y: auto"
                  >
                    <div class="columns is-centered is-vcentered is-marginless">
                      <div class="column is-paddingless"></div>
                      <div class="column is-paddingless">
                        <p class="is-size-6">
                          <strong class="has-txt-value-number"
                            >Conditions</strong
                          >
                        </p>
                      </div>
                      <div class="column is-paddingless">
                        <a
                          id="addNewConditionsButton"
                          class="is-pulled-right is-size-6"
                          ><span class="icon has-text-info"
                            ><i class="fal fa-plus-circle"></i></span
                        ></a>
                      </div>
                    </div>
                    <div
                      id="conditionsContent"
                      class="buttons is-centered mx-1"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="tile is-2">
                <div
                  class="mobile-box tile mobile-is-marginless mobile-apply-flex sheet-box ml-2 mb-4"
                >
                  <div
                    class="tile is-child is-paddingless cursor-clickable pt-2"
                    id="classDCSection"
                  >
                    <p class="is-size-6 is-unselectable">
                      <strong class="has-txt-value-number">Class DC</strong>
                    </p>
                    <p
                      id="classDCContent"
                      class="is-size-5 has-txt-listing pl-2"
                    ></p>
                  </div>
                  <div class="tile is-child pt-2">
                    <p id="heroPointsTitle" class="is-size-7 cursor-clickable">
                      <strong class="has-txt-value-number">Hero Points</strong>
                    </p>
                    <div class="select">
                      <select id="heroPointsSelect">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tile is-1">
                <div
                  class="mobile-box tile mobile-is-marginless ml-2 mt-2 mb-4"
                >
                  <div class="tile is-child">
                    <a
                      id="backToBuilderButton"
                      class="button is-info is-rounded is-small has-text-white mb-2"
                    >
                      <span>Edit</span>
                      <span class="icon">
                        <i class="fas fa-cog"></i>
                      </span>
                    </a>
                    <a id="restButton" class="button is-info is-outlined">
                      <span>Rest</span>
                      <span class="icon is-very-small">
                        <i class="far fa-snooze fa-xs"></i>
                      </span>
                    </a>

                    <a
                      id="copyCharButton"
                      class="button is-info is-outlined is-hidden mb-2"
                      ><span>Copy</span
                      ><span class="icon"
                        ><i class="fas fa-user-friends"></i></span
                    ></a>
                    <a
                      id="exportCharButton"
                      class="button is-info is-outlined is-hidden"
                      ><span>Export</span
                      ><span class="icon"><i class="fas fa-download"></i></span
                    ></a>
                  </div>
                </div>
              </div>
            </div>
            <div class="tile is-parent is-paddingless">
              <div class="tile is-3">
                <div class="mobile-box tile mobile-is-marginless my-2 mr-4">
                  <div
                    class="tile is-child is-paddingless sheet-box cursor-clickable"
                    id="speedSection"
                  >
                    <p class="is-size-6 is-unselectable">
                      <strong class="has-txt-value-number">Speed</strong>
                    </p>
                    <p
                      id="speedContent"
                      class="is-size-5 has-txt-listing pl-2"
                    ></p>
                    <div id="speedBottom" class="is-hidden">
                      <hr id="speedDivider" class="m-1" />
                      <p class="is-size-7 has-txt-listing">View Others</p>
                    </div>
                  </div>
                </div>
                <div class="mobile-box tile m-2">
                  <div
                    class="tile is-child is-paddingless sheet-box cursor-clickable"
                    id="perceptionBonusSection"
                  >
                    <p class="is-size-6 is-unselectable">
                      <strong class="has-txt-value-number">Perception</strong>
                    </p>
                    <p
                      id="perceptionBonusContent"
                      class="is-size-5 has-txt-listing pr-3"
                    ></p>
                    <div id="perceptionBonusBottom">
                      <hr id="perceptionBonusDivider" class="m-1" />
                      <p
                        id="perceptionPrimaryVisionSense"
                        class="is-size-7 has-txt-listing"
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tile is-6">
                <div class="mobile-box tile mobile-is-marginless my-2 mx-4">
                  <!-- Ability Scores -->
                  <div class="tile sheet-box mobile-apply-flex">
                    <div
                      id="strSection"
                      class="tile is-child is-paddingless cursor-clickable pt-2"
                    >
                      <div class="is-size-7 is-unselectable">Strength</div>
                      <div id="strMod" class="is-size-4 pr-3"></div>
                      <span
                        id="strScore"
                        class="sheet-small-box is-size-7 has-txt-listing"
                      ></span>
                    </div>
                    <div
                      id="dexSection"
                      class="tile is-child is-paddingless cursor-clickable pt-2"
                    >
                      <div class="is-size-7 is-unselectable">Dexterity</div>
                      <div id="dexMod" class="is-size-4 pr-3"></div>
                      <span
                        id="dexScore"
                        class="sheet-small-box is-size-7 has-txt-listing"
                      ></span>
                    </div>
                    <div
                      id="conSection"
                      class="tile is-child is-paddingless cursor-clickable pt-2"
                    >
                      <div class="is-size-7 is-unselectable">Constitution</div>
                      <div id="conMod" class="is-size-4 pr-3"></div>
                      <span
                        id="conScore"
                        class="sheet-small-box is-size-7 has-txt-listing"
                      ></span>
                    </div>
                    <div
                      id="intSection"
                      class="tile is-child is-paddingless cursor-clickable pt-2"
                    >
                      <div class="is-size-7 is-unselectable">Intelligence</div>
                      <div id="intMod" class="is-size-4 pr-3"></div>
                      <span
                        id="intScore"
                        class="sheet-small-box is-size-7 has-txt-listing"
                      ></span>
                    </div>
                    <div
                      id="wisSection"
                      class="tile is-child is-paddingless cursor-clickable pt-2"
                    >
                      <div class="is-size-7 is-unselectable">Wisdom</div>
                      <div id="wisMod" class="is-size-4 pr-3"></div>
                      <span
                        id="wisScore"
                        class="sheet-small-box is-size-7 has-txt-listing"
                      ></span>
                    </div>
                    <div
                      id="chaSection"
                      class="tile is-child is-paddingless cursor-clickable pt-2"
                    >
                      <div class="is-size-7 is-unselectable">Charisma</div>
                      <div id="chaMod" class="is-size-4 pr-3"></div>
                      <span
                        id="chaScore"
                        class="sheet-small-box is-size-7 has-txt-listing"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tile is-3">
                <div
                  class="mobile-box tile is-vertical mobile-is-marginless sheet-box my-2 ml-2"
                >
                  <!-- Saving Throws -->
                  <p class="is-size-6 has-text-centered has-txt-value-number">
                    Saving Throws
                  </p>
                  <div
                    class="tile is-centered is-paddingless mobile-apply-flex"
                  >
                    <div
                      id="fortSection"
                      class="tile is-child is-paddingless cursor-clickable"
                    >
                      <p class="has-txt-listing">Fortitude</p>
                      <div id="fortSave" class="is-size-5 pr-2"></div>
                    </div>
                    <div
                      id="reflexSection"
                      class="tile is-child is-paddingless cursor-clickable"
                    >
                      <p class="has-txt-listing">Reflex</p>
                      <div id="reflexSave" class="is-size-5 pr-2"></div>
                    </div>
                    <div
                      id="willSection"
                      class="tile is-child is-paddingless cursor-clickable"
                    >
                      <p class="has-txt-listing">Will</p>
                      <div id="willSave" class="is-size-5 pr-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mobile-box tile m-2 pr-4">
            <div
              class="tile is-parent is-vertical is-2 mobile-is-marginless is-paddingless my-2 mr-4"
            >
              <div class="mobile-box tile is-paddingless p-3">
                <div
                  id="acSection"
                  class="tile is-child is-unselectable background-ac has-tooltip-bottom pt-4"
                  data-tooltip=""
                >
                  <p id="acText" class="px-2">
                    <strong class="has-txt-listing">AC</strong>
                  </p>
                  <p id="acNumber" class="has-txt-listing"></p>
                </div>
                <div
                  id="shieldSection"
                  class="tile is-child background-shield has-tooltip-bottom is-hidden pt-4"
                  data-tooltip=""
                >
                  <p id="shieldText" class="">
                    <strong class="has-txt-listing">Shield</strong>
                  </p>
                  <p id="shieldBonus" class="has-txt-listing pr-2"></p>
                </div>
              </div>
              <div class="mobile-box tile is-vertical sheet-box">
                <div
                  class="use-custom-scrollbar"
                  style="
                    height: 550px;
                    max-height: 550px;
                    overflow-y: auto;
                    overflow-x: hidden;
                  "
                >
                  <div class="tile is-paddingless">
                    <div class="tile is-child">
                      <p class="is-size-6">
                        <strong class="has-txt-value-number pl-4"
                          >Attacks</strong
                        ><a
                          id="addNewProfButton"
                          class="is-pulled-right is-size-6"
                          ><span class="icon has-text-info"
                            ><i class="fal fa-plus-circle"></i></span
                        ></a>
                      </p>
                      <p id="attacksContent"></p>
                    </div>
                  </div>
                  <div class="tile is-paddingless">
                    <div class="tile is-child">
                      <p class="is-size-6">
                        <strong class="has-txt-value-number">Defenses</strong>
                      </p>
                      <p id="defensesContent"></p>
                    </div>
                  </div>
                  <div id="spellsContentSection" class="tile is-paddingless">
                    <div class="tile is-child">
                      <p class="is-size-6">
                        <strong class="has-txt-value-number">Spells</strong>
                      </p>
                      <p id="spellsContent"></p>
                    </div>
                  </div>
                  <div class="tile is-paddingless">
                    <div class="tile is-child py-2">
                      <p class="is-size-6">
                        <strong class="has-txt-value-number pl-4"
                          >Languages</strong
                        ><a
                          id="addNewLangButton"
                          class="is-pulled-right is-size-6"
                          ><span class="icon has-text-info"
                            ><i class="fal fa-plus-circle"></i></span
                        ></a>
                      </p>
                      <p id="languagesContent" class="is-unselectable px-2"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tile is-parent is-2 is-paddingless">
              <div class="tile is-child">
                <nav
                  class="mobile-box panel is-dark is-shadowless sheet-box my-2 mx-1"
                >
                  <p class="is-size-5">
                    <strong class="has-txt-value-number pl-4">Skills</strong
                    ><a
                      id="addNewLoreButton"
                      class="is-pulled-right is-size-6 is-paddingless"
                      ><span class="icon has-text-info"
                        ><i class="fal fa-plus-circle"></i></span
                    ></a>
                  </p>
                  <hr class="border-secondary is-marginless" />
                  <div
                    id="skills"
                    class="use-custom-scrollbar"
                    style="max-height: 660px; overflow-y: auto"
                  ></div>
                </nav>
              </div>
            </div>

            <div class="tile is-parent is-8 is-paddingless">
              <div class="tile is-child" style="width: 100%">
                <div
                  class="sheet-box use-custom-scrollbar mobile-is-marginless my-2 ml-4"
                  style="
                    min-height: 700px;
                    overflow-y: auto;
                    overflow-x: scroll;
                  "
                >
                  <div
                    id="char-sheet-tabs"
                    class="tabs is-centered is-boxed is-medium is-marginless use-custom-scrollbar"
                  >
                    <ul class="sheet-tabs">
                      <li>
                        <a id="actionsTab"
                          ><span class="pf-icon">[free-action]</span
                          ><span class="pl-2">Actions</span></a
                        >
                      </li>
                      <li>
                        <a id="weaponsTab"
                          ><i class="far fa-swords"></i
                          ><span class="pl-2">Weapons</span></a
                        >
                      </li>
                      <li>
                        <a id="spellsTab"
                          ><i class="far fa-wand-magic"></i
                          ><span class="pl-2">Spells</span></a
                        >
                      </li>
                      <li>
                        <a id="inventoryTab"
                          ><i class="far fa-backpack"></i
                          ><span class="pl-2">Inventory</span></a
                        >
                      </li>
                      <li>
                        <a id="companionsTab">
                          <i class="far fa-paw-claws"></i>
                          <span class="pl-2">Companions</span>
                        </a>
                      </li>
                      <li>
                        <a id="detailsTab"
                          ><i class="far fa-file-search"></i
                          ><span class="pl-2">Details</span></a
                        >
                      </li>
                      <li>
                        <a id="notesTab"
                          ><i class="far fa-scroll"></i
                          ><span class="pl-2">Notes</span></a
                        >
                      </li>
                    </ul>
                  </div>
                  <div id="tabContent" class="pos-relative mx-3 mb-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Right Quickview -->
    <div id="quickviewDefault" class="quickview">
      <div class="quickview-header">
        <p id="quickViewTitle" class="title is-size-5 has-txt-value-number"></p>
        <div class="is-inline-flex">
          <p id="quickViewTitleRight"></p>
          <p id="quickViewTitleClose"></p>
        </div>
      </div>
      <div class="quickview-body use-custom-scrollbar">
        <div id="quickViewContent" class="quickview-block px-3 pt-1 pb-3"></div>
      </div>
    </div>

    <!-- Left Quickview -->
    <div id="quickviewLeftDefault" class="quickview is-left">
      <div class="quickview-header">
        <p id="quickViewLeftTitle" class="title is-size-5 has-txt-value-number">
          Sheet Tools
        </p>
        <div class="is-inline-flex">
          <p id="quickViewLeftTitleClose"></p>
        </div>
      </div>
      <div class="quickview-body use-custom-scrollbar">
        <div class="quickview-block px-3 pb-3">
          <div class="tabs is-centered is-marginless">
            <ul class="quickViewLeft-Tabs">
              <li><a id="quickViewLeftTab-Toggleables">Toggleables</a></li>
              <li><a id="quickViewLeftTab-DiceRoller">Dice Roller</a></li>
              <li class="is-hidden">
                <a id="quickViewLeftTab-Campaign">Campaign</a>
              </li>
            </ul>
          </div>
          <div id="quickViewLeftContent" class="pos-relative pt-3"></div>
        </div>
      </div>
      <div id="quickViewLeftOuterExtra" class=""></div>
    </div>

    <!-- Conditions Modal -->
    <div id="conditionsModalDefault" name="" class="modal" style="z-index: 30">
      <div id="conditionsModalBackground" class="modal-background"></div>
      <div class="modal-card">
        <div class="modal-card-head">
          <p
            id="conditionsModalTitle"
            class="modal-card-title has-text-centered is-size-4 has-txt-value-number"
          ></p>
          <a id="conditionsModalRemoveButton" class="is-pulled-right is-size-6"
            ><span class="icon is-medium has-text-danger"
              ><i class="fal fa-minus-circle"></i></span
          ></a>
        </div>
        <section class="modal-card-body py-2">
          <p id="conditionsModalSourceSection" class="has-text-centered">
            <strong class="has-txt-listing">From: </strong
            ><em id="conditionsModalSourceContent"></em>
          </p>
          <p id="conditionsModalContent"></p>
        </section>
        <div
          id="conditionsModalFooter"
          class="modal-card-foot buttons is-centered"
        >
          <button
            id="conditionsModalSubtractButton"
            class="button is-very-small is-info is-rounded"
          >
            <span class="icon">
              <i class="fas fa-heading fa-minus"></i>
            </span>
          </button>
          <button
            id="conditionsModalValueButton"
            class="button is-static has-bg-selectable-hover border-dark"
          >
            <p id="conditionsModalValue" class="has-txt-value-number"></p>
          </button>
          <button
            id="conditionsModalAddButton"
            class="button is-very-small is-info is-rounded"
          >
            <span class="icon">
              <i class="fas fa-heading fa-plus"></i>
            </span>
          </button>
        </div>
      </div>
      <button
        id="conditionsModalCloseButton"
        class="modal-close is-large is-hidden-mobile"
        aria-label="close"
      ></button>
    </div>

    <!-- Conditions Select Modal -->
    <div
      id="conditionsSelectModalDefault"
      name=""
      class="modal"
      style="z-index: 30"
    >
      <div id="conditionsSelectModalBackground" class="modal-background"></div>
      <div class="modal-card">
        <div class="modal-card-head">
          <p
            id="conditionsSelectModalTitle"
            class="modal-card-title has-text-centered is-size-4 has-txt-value-number"
          >
            Choose a Condition
          </p>
          <button
            id="conditionsSelectModalCloseButton"
            class="delete modal-card-close"
            aria-label="close"
          ></button>
        </div>
        <section
          class="modal-card-body is-paddingless use-invisible-scrollbar p-2"
        >
          <div
            id="conditionsSelectModalContent"
            class="tile is-ancestor is-vertical"
          ></div>
        </section>
        <div class="modal-card-foot"></div>
      </div>
    </div>

    <!-- Spells Manager Modal -->
    <div
      id="manageSpellsModalDefault"
      name=""
      class="modal"
      style="z-index: 30"
    >
      <div id="manageSpellsModalBackground" class="modal-background"></div>
      <div id="manageSpellsModalCard" class="modal-card">
        <div class="modal-card-head">
          <p
            id="manageSpellsModalTitle"
            class="modal-card-title has-text-centered is-size-4 has-txt-value-number"
          >
            Manage Spells<span
              class="icon is-size-6 has-text-info has-tooltip-multiline has-tooltip-bottom"
              data-tooltip="For prepared spellcasters, drag spells from your spell list over to the appropriate slots to prepare them."
              ><i class="far fa-question-circle"></i
            ></span>
          </p>
          <button
            id="manageSpellsModalCloseButton"
            class="delete modal-card-close"
            aria-label="close"
          ></button>
        </div>
        <section
          class="modal-card-body is-paddingless px-2"
          style="overflow: hidden"
        >
          <div class="tabs is-boxed is-small is-marginless">
            <ul
              id="manageSpellsTabs"
              class="sheet-tabs has-txt-value-number"
            ></ul>
          </div>
          <div
            class="columns is-mobile is-marginless"
            style="height: 100%; padding-bottom: 2rem"
          >
            <div
              class="column is-paddingless is-3-desktop is-4-tablet is-6-mobile"
              style="height: 100%"
            >
              <div
                class="columns is-mobile is-marginless has-bg-options-header-bold"
              >
                <div
                  id="manageSpellsListName"
                  class="column is-10 is-paddingless"
                ></div>
                <div class="column is-2 is-paddingless">
                  <span
                    id="manageSpellsOpenSpellListsBtn"
                    class="icon is-medium has-text-info cursor-clickable pt-2"
                  >
                    <i class="fas fa-lg fa-plus"></i>
                  </span>
                </div>
              </div>
              <div class="border-top border-bottom border-dark-lighter">
                <p class="control has-icons-left">
                  <input
                    id="manageSpellsSpellBookSearch"
                    class="input"
                    type="text"
                    placeholder="Search"
                  />
                  <span class="icon is-left"
                    ><i class="fas fa-search" aria-hidden="true"></i
                  ></span>
                </p>
              </div>
              <div
                id="manageSpellsSpellBook"
                class="use-custom-scrollbar is-darker"
                style="overflow-y: auto; height: calc(100% - 80px)"
              ></div>
            </div>
            <div
              class="column is-paddingless is-9-desktop is-8-tablet is-6-mobile pos-relative"
            >
              <div
                id="manageSpellsSlots"
                class="use-custom-scrollbar is-darker"
                style="overflow-y: auto; height: 100%"
              ></div>
              <div class="pos-absolute pos-t-0 pos-r-4">
                <span
                  id="manageSpellsAddNewSlotBtn"
                  class="icon is-medium has-text-info cursor-clickable has-tooltip-left"
                  data-tooltip="Add Spell Slot"
                >
                  <i class="fas fa-lg fa-shapes"></i>
                </span>
              </div>
            </div>
          </div>
        </section>
        <div class="modal-card-foot"></div>
      </div>
    </div>

    <!-- Note Page More Modal -->
    <div id="note-page-more-modal" class="modal" data-page-id="">
      <div id="note-page-more-modal-background" class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-size-4 has-txt-value-number">
            Page Options
          </p>
          <button
            id="note-page-more-modal-close"
            class="delete modal-card-close"
            aria-label="close"
          ></button>
        </header>
        <section id="note-page-more-modal-body" class="modal-card-body pb-2">
          <div class="field">
            <div class="control">
              <input
                id="note-page-more-modal-page-name"
                class="input"
                type="text"
                maxlength="20"
                spellcheck="false"
                autocomplete="off"
                value=""
                placeholder="Page Name"
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <div class="select">
                <select id="note-page-more-modal-page-color">
                  <option value="is-info" class="has-text-info">
                    Guide Blue
                  </option>
                  <option value="is-link" class="has-text-link">Blue</option>
                  <option value="is-success" class="has-text-success">
                    Green
                  </option>
                  <option value="is-danger" class="has-text-danger">Red</option>
                  <option value="is-primary" class="has-text-primary">
                    Turquoise
                  </option>
                  <option value="is-warning" class="has-text-warning">
                    Yellow
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <button
                id="note-page-more-modal-page-delete"
                class="button is-small is-danger is-outlined"
              >
                <span>Delete</span>
                <span class="icon is-small">
                  <i class="fas fa-times"></i>
                </span>
              </button>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot"></footer>
      </div>
    </div>

    <!-- Pre-Load Fonts -->
    <div class="font_preload" style="opacity: 0">
      <span class="pf-icon"></span>
    </div>

    <footer id="wanderers-guide-footer">
      <div class="cpy-right py-3 text-center">
        <p class="is-size-7 text-center">
          Wanderer's Guide<sup class="icon is-small"
            ><i class="fas fa-xs fa-trademark"></i
          ></sup>
          <span class="has-txt-faded"> | </span>
          <a href="/license" target="_blank">Licenses and Policies</a>
          <span class="has-txt-faded"> | </span>
          <a class="has-tooltip-top" data-tooltip="wanderersguide2e@gmail.com"
            ><sub class="icon is-small"
              ><i class="far fa-lg fa-envelope"></i></sub
          ></a>
          <span class="has-txt-faded"> | </span>
          <a href="https://discord.gg/kxCpa6G" target="_blank"
            ><sub class="icon is-small"
              ><i class="fab fa-lg fa-discord"></i></sub
          ></a>
          <span class="has-txt-faded"> | </span>
          <a href="https://www.patreon.com/wanderersguide" target="_blank"
            ><sub class="icon is-small"
              ><i class="fab fa-lg fa-patreon"></i></sub
          ></a>
        </p>
      </div>
    </footer>
  </div>

  <div class="">
    <div class="dice-pageloader">
      <div class="ldBar-container">
        <div
          class="ldBar label-center is-hidden"
          data-type="fill"
          data-img="/images/dice-d20.svg"
          data-fill-background-extrude="0"
          data-fill-background="var(--main-loading-bg-color)"
          data-img-size="120,120"
          data-duration="1"
        ></div>
        <p class="ldBar-message"></p>
      </div>
    </div>
  </div>

  <div class="subpageloader is-hidden">
    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "../../legacy-js/sheet/char-sheet.js";

import "../../legacy-js/sheet/tabs/_tabs.js";
import "../../legacy-js/sheet/tabs/actions-tab.js";
import "../../legacy-js/sheet/tabs/details-tab.js";
import "../../legacy-js/sheet/tabs/inventory-tab.js";
import "../../legacy-js/sheet/tabs/notes-tab.js";
import "../../legacy-js/sheet/tabs/spells-tab.js";
import "../../legacy-js/sheet/tabs/companions-tab.js";
import "../../legacy-js/sheet/tabs/weapons-tab.js";

import "../../legacy-js/sheet/quickviews/_left-quickview.js";
import "../../legacy-js/sheet/quickviews/_quickviews.js";
import "../../legacy-js/sheet/quickviews/ability-score-view.js";
import "../../legacy-js/sheet/quickviews/add-item-view.js";
import "../../legacy-js/sheet/quickviews/add-spell-view.js";
import "../../legacy-js/sheet/quickviews/customize-item-view.js";
import "../../legacy-js/sheet/quickviews/feat-view.js";
import "../../legacy-js/sheet/quickviews/class-dc-view.js";
import "../../legacy-js/sheet/quickviews/hero-points-view.js";
import "../../legacy-js/sheet/quickviews/ac-view.js";
import "../../legacy-js/sheet/quickviews/inv-item-view.js";
import "../../legacy-js/sheet/quickviews/language-view.js";
import "../../legacy-js/sheet/quickviews/perception-view.js";
import "../../legacy-js/sheet/quickviews/saving-throw-view.js";
import "../../legacy-js/sheet/quickviews/skill-view.js";
import "../../legacy-js/sheet/quickviews/spell-view.js";
import "../../legacy-js/sheet/quickviews/spell-empty-view.js";
import "../../legacy-js/sheet/quickviews/item-view.js";
import "../../legacy-js/sheet/quickviews/char-info-view.js";
import "../../legacy-js/sheet/quickviews/ability-view.js";
import "../../legacy-js/sheet/quickviews/resist-view.js";
import "../../legacy-js/sheet/quickviews/speed-view.js";
import "../../legacy-js/sheet/quickviews/other-profs-view.js";
import "../../legacy-js/sheet/quickviews/customize-prof-view.js";
import "../../legacy-js/sheet/quickviews/animal-comp-view.js";
import "../../legacy-js/sheet/quickviews/familiar-view.js";
import "../../legacy-js/sheet/quickviews/add-prof-view.js";
import "../../legacy-js/sheet/quickviews/add-lang-view.js";
import "../../legacy-js/sheet/quickviews/add-lore-view.js";
import "../../legacy-js/sheet/quickviews/add-spell-slot-view.js";
import "../../legacy-js/sheet/quickviews/add-resist-view.js";
import "../../legacy-js/sheet/quickviews/add-weak-view.js";
import "../../legacy-js/sheet/quickviews/resist-list-view.js";
import "../../legacy-js/sheet/quickviews/add-unarmed-attack-view.js";
import "../../legacy-js/sheet/quickviews/tag-view.js";
import "../../legacy-js/sheet/quickviews/condition-view.js";
import "../../legacy-js/sheet/quickviews/item-breakdown-view.js";
import "../../legacy-js/sheet/quickviews/warnings-view.js";

import "../../legacy-js/sheet/general/stat-manager.js";
import "../../legacy-js/sheet/general/conditions-manager.js";
import "../../legacy-js/sheet/general/remote-updates.js";

import "../../legacy-js/sheet/general/manage-spells.js";
import "../../legacy-js/sheet/general/coin-manager.js";
import "../../legacy-js/sheet/general/sheet-states.js";
import "../../legacy-js/sheet/general/weap-mod-manager.js";
import "../../legacy-js/sheet/general/item-runes.js";
import "../../legacy-js/sheet/general/critical-specializations.js";
import "../../legacy-js/sheet/general/notes-fields.js";

import "../../legacy-js/prof/prof-manager.js";
import "../../legacy-js/sheet/general/prof-history-display.js";

import "../../legacy-js/libraries/confirm_message/confirm-message.js";

import "../../legacy-js/char_export/export-handler.js";

import "../../legacy-js/char_builders/variants/auto-bonus-progression.js";

import "../../legacy-js/char_builders/variants/gradual-ability-boosts.js";

import "../../legacy-js/wsc/text-processing.js";
import "../../legacy-js/wsc/variable-processing.js";
import "../../legacy-js/wsc/expression-processing.js";
import "../../legacy-js/wsc/expression-utils.js";
import "../../legacy-js/wsc/statement-processing.js";
import "../../legacy-js/wsc/removal-processing.js";
import "../../legacy-js/wsc/misc-feat-processing.js";
import "../../legacy-js/wsc/add-text-processing.js";
import "../../legacy-js/wsc/errorHandling.js";
import "../../legacy-js/wsc/default-statement-processing.js";

import "../../legacy-js/sheet/utils/sheet-reload.js";
import "../../legacy-js/sheet/utils/calc-utils.js";
import "../../legacy-js/sheet/utils/prof-map-utils.js";
import "../../legacy-js/sheet/utils/animal-comp-utils.js";
import "../../legacy-js/sheet/utils/familiar-utils.js";
import "../../legacy-js/sheet/utils/item-actions-generator.js";
import "../../legacy-js/sheet/utils/struct-utils.js";
import "../../legacy-js/sheet/utils/material-utils.js";
import "../../legacy-js/sheet/utils/item-utils.js";
import "../../legacy-js/sheet/utils/spell-utils.js";
import "../../legacy-js/sheet/utils/utils.js";

import "../../legacy-js/sheet/utils/dice-roller.js";
import { useUser } from "../../stores/user";

const userStore = useUser();

const user = userStore.user;
</script>
<style lang="scss">
// @import "https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css";
// @import "/css/sheet-styles.css";
</style>
