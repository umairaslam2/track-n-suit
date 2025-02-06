export const FB_PIXEL_ID = "963134622257005"; // Your Pixel ID

export const pageview = () => {
  window.fbq("track", "PageView");
};

export const event = (name, options = {}) => {
  window.fbq("track", name, options);
};
