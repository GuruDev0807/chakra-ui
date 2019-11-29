import * as React from "react";
import useControllableValue from "../useControllableValue";
import createCtx from "../useCreateContext";
import useId from "../useId";
import useTabbable, { UseTabbableOptions } from "../useTabbable";
import { createOnKeyDown, composeEventHandlers } from "@chakra-ui/utils";

export interface UseTabsOptions {
  /**
   * The orientation of the tablist.
   */
  orientation?: "vertical" | "horizontal";
  /**
   * If `true`, the tabs will be manually activated and
   * display its panel by pressing Space or Enter.
   *
   * If `false`, the tabs will be automatically activated
   * and their panel is displayed when they receive focus.
   */
  isManual?: boolean;
  /**
   * The children of the tabs should be tabpanel and tabpanels.
   */
  children: React.ReactNode;
  /**
   * Callback when the index (controlled or un-controlled) changes.
   */
  onChange?: (index: number) => void;
  /**
   * The index of the selected tab (in controlled mode)
   */
  index?: number;
  /**
   * The initial index of the selected tab (in uncontrolled mode)
   */
  defaultIndex?: number;
  /**
   * The id of the tab
   */
  id?: string;
}

const [useTabsContext, TabContextProvider] = createCtx<any>();
export { TabContextProvider };

export function useTabs(props: UseTabsOptions) {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(
    props.defaultIndex || 0,
  );
  const [focusedIndex, setFocusedIndex] = React.useState<number>(
    props.defaultIndex || 0,
  );

  const [isControlled, _selectedIndex] = useControllableValue(
    props.index,
    selectedIndex,
  );

  // Reference to all elements with `role=tab`
  const tabNodesRef = React.useRef<HTMLElement[]>([]);
  // Reference to the tablist
  const tablistRef = React.useRef<HTMLElement>();

  // sync focus with selection in controlled mode
  React.useEffect(() => {
    if (isControlled && props.index != undefined) {
      setFocusedIndex(props.index);
    }
  }, [isControlled, props.index]);

  const id = useId(`tabs`, props.id);

  const onChange = (index: number) => {
    if (!isControlled) {
      setSelectedIndex(index);
    }
    if (props.onChange) {
      props.onChange(index);
    }
  };

  const onFocus = (index: number) => setFocusedIndex(index);

  return {
    id,
    isControlled,
    selectedIndex: _selectedIndex,
    focusedIndex,
    onChange,
    onFocus,
    isManual: props.isManual,
    orientation: props.orientation,
    tabNodesRef,
    tablistRef,
  };
}

////////////////////////////////////////////////////////////////////////

export interface UseTabOptions extends UseTabbableOptions {
  id?: string;
  isSelected?: boolean;
  panelId?: string;
}

export function useTab(props: UseTabOptions) {
  const { isSelected, isDisabled, id, panelId, ...rest } = props;
  const tab: any = useTabbable({
    ...rest,
    clickOnSpace: true,
    clickOnEnter: true,
    isDisabled,
  });

  return {
    ...tab,
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    type: "button",
    "aria-selected": isSelected ? true : undefined,
    "aria-controls": panelId,
  };
}

////////////////////////////////////////////////////////////////////////

export interface UseTabListOptions {
  children?: React.ReactNode;
  onKeyDown?: React.KeyboardEventHandler<any>;
}

export function useTabList(props: UseTabListOptions) {
  // Read from context
  const tabs = useTabsContext();

  // Get all the focusable tab indexes
  // A tab is focusable if it's not disabled or is disabled and has focusable prop
  // ARIA: It's a good idea to allow users focus on disabled tabs so you tell them why it's disabled
  const focusableIndexes = React.Children.map(
    props.children,
    (child: any, index) => {
      const isTrulyDisabled =
        child.props.isDisabled && !child.props.isFocusable;
      return isTrulyDisabled ? null : index;
    },
  ).filter(child => child !== null) as number[];
  const enabledSelectedIndex = focusableIndexes.indexOf(tabs.focusedIndex);
  const count = focusableIndexes.length;

  // Function to update the selected tab index
  const updateActiveIndex = (index: number) => {
    const childIndex = focusableIndexes[index];
    tabs.tabNodesRef.current[childIndex].focus();
    tabs.onFocus(childIndex);
  };

  // Helper functions for keyboard navigation
  const goToNextTab = () => {
    const nextIndex = (enabledSelectedIndex + 1) % count;
    updateActiveIndex(nextIndex);
  };
  const goToPrevTab = () => {
    const nextIndex = (enabledSelectedIndex - 1 + count) % count;
    updateActiveIndex(nextIndex);
  };
  const goToFirst = () => updateActiveIndex(0);
  const goToLast = () => updateActiveIndex(count - 1);

  const isHorizontal = tabs.orientation === "horizontal";
  const isVertical = tabs.orientation === "vertical";

  // Function to handle keyboard navigation
  const onKeyDown = createOnKeyDown({
    keyMap: {
      ArrowRight: () => isHorizontal && goToNextTab(),
      ArrowLeft: () => isHorizontal && goToPrevTab(),
      ArrowDown: () => isVertical && goToNextTab(),
      ArrowUp: () => isVertical && goToPrevTab(),
      Home: () => goToFirst(),
      End: () => goToLast(),
    },
  });

  // Enhance the children by passing some props to them
  // TODO: Ideally this should be using context
  const children = React.Children.map(props.children, (child: any, index) => {
    let isSelected = index === tabs.selectedIndex;

    const onClick = () => {
      tabs.onFocus(index);
      if (tabs.onChange) {
        tabs.onChange(index);
      }
    };

    const onFocus = () => {
      const isDisabledButFocusable =
        child.props.isDisabled && child.props.isFocusable;
      if (!tabs.isManual && !isDisabledButFocusable) {
        tabs.onChange(index);
      }
    };

    return React.cloneElement(child, {
      id: `${tabs.id}--tab-${index}`,
      panelId: `${tabs.id}--tabpanel-${index}`,
      ref: (node: HTMLElement) => (tabs.tabNodesRef.current[index] = node),
      isSelected,
      onClick: composeEventHandlers(child.props.onClick, onClick),
      onFocus: composeEventHandlers(child.props.onFocus, onFocus),
    });
  });

  return {
    ref: tabs.tablistRef,
    role: "tablist",
    "aria-orientation": tabs.orientation,
    onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
    children,
  };
}

////////////////////////////////////////////////////////////////////////

export function useTabPanels(props: { children: React.ReactNode }) {
  const tabs = useTabsContext();

  const children = React.Children.map(props.children, (child, index) => {
    if (!React.isValidElement(child)) return;

    return React.cloneElement(child as any, {
      isSelected: index === tabs.selectedIndex,
      id: `${tabs.id}--tabpanel-${index}`,
    });
  });

  return children;
}

////////////////////////////////////////////////////////////////////////

export function useTabPanel(props: { isSelected?: boolean; id?: string }) {
  return {
    role: "tabpanel",
    hidden: !props.isSelected,
    id: props.id,
  };
}

////////////////////////////////////////////////////////////////////////

export function useTabIndicator(): React.CSSProperties {
  const tabs = useTabsContext();
  const isHorizontal = tabs.orientation === "horizontal";
  const isVertical = tabs.orientation === "vertical";

  // Get the clientRect of the selected tab
  const [rect, setRect] = React.useState(() => {
    if (isHorizontal) return { left: 0, width: 0 };
    if (isVertical) return { top: 0, height: 0 };
  });

  // Update the selected tab rect when the selectedIndex changes
  React.useLayoutEffect(() => {
    if (tabs.selectedIndex == undefined) return;
    const selectedTabNode = tabs.tabNodesRef.current[tabs.selectedIndex];

    // Get the rect of the selected tab
    const selectedTabRect =
      selectedTabNode && selectedTabNode.getBoundingClientRect();

    // Get the rect of the tablist
    const tabListRect =
      tabs.tablistRef.current &&
      tabs.tablistRef.current.getBoundingClientRect();

    // Horizontal Tab: Calculate width and left distance
    if (isHorizontal && tabListRect && selectedTabRect) {
      const left = selectedTabRect.left - tabListRect.left;
      const width = selectedTabRect.width;
      setRect({ left, width });
    }

    // Vertical Tab: Calculate height and top distance
    if (isVertical && tabListRect && selectedTabRect) {
      const top = selectedTabRect.top - tabListRect.top;
      const height = selectedTabRect.height;
      setRect({ top, height });
    }
  }, [tabs.selectedIndex, tabs.tabNodesRef, tabs.tablistRef, tabs.orientation]);

  return {
    position: "absolute",
    transition: "all 200ms cubic-bezier(0, 0, 0.2, 1)",
    ...rect,
  };
}
