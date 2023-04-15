<template>
  <body>
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
                        <a href="/v/profile/characters">Characters</a>
                      </li>
                    </template>
                    <template v-else>
                      <span class="ml-lg-4 ml-md-3"></span>
                    </template>

                    <li>
                      <a href="/builds" class="active">Builds</a>
                    </li>

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
                            :data="user.thumbnail"
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
                          <template v-if="user.isAdmin === 1">
                            <li>
                              <a href="/admin/panel" class="drop-text"
                                ><i class="fas fa-tools"></i>
                                Admin Panel
                              </a>
                            </li>
                          </template>
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
                      </li> </template
                    ><template v-else>
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
        <div
          id="builds-container"
          class="container"
          :data-view-build-id="viewBuildID"
          :data-direct-to-tab="buildTabName"
          :data-user-id="user?.id"
        >
          <div class="tabs is-centered is-boxed use-custom-scrollbar mb-2">
            <ul class="category-tabs">
              <li><a id="browseTab">Browse Builds</a></li>
              <template v-if="user">
                <li><a id="userContentTab">My Builds</a></li>
              </template>
            </ul>
          </div>
          <div id="tabContent" class="mx-3 mb-3"></div>
          <!-- tabContent must be empty! -->
          <div class="subpageloader is-hidden mt-5 pt-5">
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
        </div>
      </div>

      <!-- Right Quickview -->
      <div id="quickviewDefault" class="quickview">
        <div class="quickview-header">
          <p
            id="quickViewTitle"
            class="title is-size-5 has-txt-value-number"
          ></p>
          <div class="is-inline-flex">
            <p id="quickViewTitleRight"></p>
            <p id="quickViewTitleClose"></p>
          </div>
        </div>
        <div class="quickview-body use-custom-scrollbar">
          <div
            id="quickViewContent"
            class="quickview-block px-3 pt-1 pb-3"
          ></div>
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
  </body>
</template>
<script setup lang="ts">
import { initBuildsPage } from "../../../legacy-js/builds/general-builds.js";
import "../../../legacy-js/builds/user-content.js";
import { listenForPublishedBuilds } from "../../../legacy-js/builds/builds-browse.js";
import "../../../legacy-js/browse/browse-utils.js";

import "../../../legacy-js/libraries/display_class/display-class.js";
import "../../../legacy-js/libraries/display_ancestry/display-ancestry.js";
import "../../../legacy-js/libraries/display_archetype/display-archetype.js";
import "../../../legacy-js/libraries/display_background/display-background.js";
import "../../../legacy-js/libraries/display_uni_heritage/display-uni-heritage.js";

import "../../../legacy-js/builds/build-view.js";

import "../../../legacy-js/libraries/confirm_message/confirm-message.js";

import "../../../legacy-js/sheet/quickviews/_quickviews.js";
import "../../../legacy-js/sheet/quickviews/feat-view.js";
import "../../../legacy-js/sheet/quickviews/language-view.js";
import "../../../legacy-js/sheet/quickviews/spell-view.js";
import "../../../legacy-js/sheet/quickviews/item-view.js";
import "../../../legacy-js/sheet/quickviews/tag-view.js";
import "../../../legacy-js/sheet/quickviews/ability-view.js";
import "../../../legacy-js/sheet/quickviews/condition-view.js";
import "../../../legacy-js/sheet/quickviews/warnings-view.js";
import "../../../legacy-js/sheet/utils/item-utils.js";
import "../../../legacy-js/sheet/utils/material-utils.js";
import "../../../legacy-js/wsc/text-processing.js";
import "../../../legacy-js/wsc/add-text-processing.js";
import "../../../legacy-js/wsc/expression-utils.js";
import { useUser } from "../../../stores/user";
import { computed, onMounted, onBeforeMount } from "vue";
import axios from "axios";

const userStore = useUser();
const user = userStore.user;

let viewBuildID: string;
let buildTabName: string;

onMounted(async () => {
  const pageInfo = await axios.get("/vue-data/page/builds");
  viewBuildID = pageInfo.data.buildId;
  buildTabName = pageInfo.data.buildTabName;
  initBuildsPage(viewBuildID, buildTabName);
  listenForPublishedBuilds();
});
</script>
<style lang="scss">
#homebrew-container {
  color: #cccccc !important;
}

.sub-section-box {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  background: var(--main-box-lighter-bg-color);
  border: 1px solid var(--main-box-lighter-bg-color);
  border-radius: 4px;
}

/* Tabs */
.category-tabs li.is-active a {
  color: #303030;
}
.category-tabs li:hover {
  color: #303030;
}

.tabs:not(.is-boxed) li.is-active a {
  border-bottom-color: #3298dc;
  color: #3298dc;
}

/* Select and Input */
.select select:focus,
.input:focus {
  border-color: #3298dc !important;
}

/* Containers */
.user-bundle-container {
  max-width: 800px;
  margin: auto;
}

.build-bundle-container {
  max-width: 800px;
  margin: auto;
}

.view-bundle-container {
  max-width: 800px;
  margin: auto;
}

/* Labels */
.field-label {
  flex-grow: 2.5;
}

.accord-header,
.accord-like-button {
  cursor: pointer !important;
  user-select: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  background: hsl(0, 0%, 12%);
  border: 1px solid #1b1b1b;
  color: #cccccc;
  border-radius: 4px;

  padding: 0.25rem !important;
}
.accord-like-button-mimic {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  background: hsl(0, 0%, 12%);
  border: 1px solid #1b1b1b;
  color: #cccccc;
  border-radius: 4px;

  padding: 0.25rem !important;
}

.accord-body {
  border: 1px solid #1d1d1d;
  border-top: 0px;
  border-radius: 0px 0px 4px 4px;
  background: #2b2b2b;
}

.accord-hover {
  background-color: hsl(0, 0%, 15%) !important;
}
.entry-hover {
  background-color: hsl(0, 0%, 19%) !important;
}
.entry-hover-darker {
  background-color: hsl(0, 0%, 15%) !important;
}

.entry-selected-darker {
  background-color: hsl(0, 0%, 15%) !important;
  font-weight: 600;
}

.accord-selection-none {
  color: hsl(0, 0%, 54%);
  font-style: italic;
}

/* Steps */
.steps .step-item .step-marker {
  background: #999;
  color: #282828;
  border-color: #282828;
}

.steps .step-item::before {
  background: linear-gradient(to left, #999 50%, #999 50%);
}

.steps .step-item.is-info.is-active .step-marker {
  background-color: #282828;
}

.step-marker a {
  color: hsl(204, 86%, 53%);
}
.step-marker a:hover {
  color: hsl(204, 86%, 53%);
}

.step-builder-title {
  font-size: 0.8rem !important;
}
.has-text-bck-color {
  color: #282828;
}
.button.is-info.is-inverted {
  background-color: #282828;
  color: #3298dc;
}
.button.is-info.is-inverted:hover {
  background-color: #282828;
}

/* Tabs */
.builder-tabs {
  border-bottom-style: none !important;
}
.builder-tabs li:hover {
  color: #3298dc;
}
.builder-tabs li {
  color: #bdbdbd;
  border-bottom-style: solid;
  border-bottom-width: 0.5px;
}
.builder-tabs a:hover {
  border-bottom-color: #3298dc;
}

.tabs:not(.is-boxed) li.is-active a {
  border-bottom-color: #3298dc !important;
  color: #3298dc !important;
}

/* Sticky Buttons */
#main-container {
  overflow: visible !important;
}
.sticky_button {
  position: -webkit-sticky !important;
  position: sticky !important;
  top: 50%;
  z-index: 10;
}
.sticky_button.is-upper {
  top: 1rem;
}
.sticky_buttons_shell {
  position: absolute;
  height: 100%;
}
.sticky_button_leftest {
  padding-left: 0.2rem;
  padding-top: 0.2rem;
}

/* Feat Selection */
.feat-selection {
  background-color: var(--selectors-color);
  color: hsl(0, 0%, 82%);
  border: 1px solid hsl(0, 0%, 13%);
  border-radius: 4px;
  line-height: 1.5;
  vertical-align: top;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 0.5rem 0;
  text-align: center;
}

.feat-selection.is-default {
  border-color: #3298dc;
}

.feat-selection-dropdown:hover {
  color: hsl(0, 0%, 68%);
  transition: 0.5s;
}

.feat-selection-list {
  background-color: var(--feat-selection-list-color);
  color: hsl(0, 0%, 76%);
  border: 1px solid hsl(0, 0%, 13%);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: 0px;
  line-height: 1.5;
  vertical-align: top;
  width: 100%;
  max-width: 400px;
  max-height: 400px;
  overflow-y: auto;
  margin: 0 auto;
}

.feat-selection-list-entry-view {
  text-align: center;
}

.feat-selection-list-entry {
  padding: 0.25rem 0;
}

.feat-selection-list-entry.is-selected {
  background-color: var(--feat-selection-selected-color);
}

.feat-selection-list-entry.is-prev-selected {
  background-color: var(--feat-selection-selected-color);
  color: hsl(0, 0%, 65%);
}

.feat-selection-is-hovered {
  background-color: var(--feat-selection-hover-color);
}

.feat-selection-level {
  background-color: var(--feat-selection-divider-color);
  color: hsl(0, 0%, 72%);
  font-weight: 800;
  text-align: center;
}

.feat-selection-none {
  background-color: var(--feat-selection-divider-color);
  color: hsl(0, 0%, 54%);
  font-style: italic;
}

.hr-feat-selection {
  border-color: hsl(0, 0%, 17%) !important;
}

.prereq-icon {
  font-size: 0.6em;
}

.prereq-true {
  text-decoration: underline;
  -webkit-text-decoration-color: hsl(204, 53%, 43%); /* Safari */
  text-decoration-color: hsl(204, 60%, 49%);
}
.prereq-false {
  text-decoration: underline;
  -webkit-text-decoration-color: hsl(348, 54%, 44%); /* Safari */
  text-decoration-color: hsl(348, 50%, 52%);
}
.prereq-unknown {
  text-decoration: underline;
  -webkit-text-decoration-color: hsl(48, 43%, 51%); /* Safari */
  text-decoration-color: hsl(48, 43%, 51%);
}

/* Feat Selection Scrollbar */
.use-feat-selection-scrollbar::-webkit-scrollbar {
  width: 0.35em;
}
.use-feat-selection-scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
}
.use-feat-selection-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--main-scrollbar-lighter-color);
  outline: 1px solid var(--main-scrollbar-lighter-color);
}
.use-feat-selection-scrollbar::-webkit-scrollbar-corner {
  background-color: var(--main-scrollbar-lighter-color);
}
.browse-container {
  color: #cccccc !important;
}

/* Tabs */
.category-tabs li.is-active a {
  color: #303030;
}
.category-tabs li:hover {
  color: #303030;
}

.tabs:not(.is-boxed) li.is-active a {
  border-bottom-color: #3298dc;
  color: #3298dc;
}

/* Select and Input */
.select select:focus,
.input:focus {
  border-color: #3298dc !important;
}
</style>
