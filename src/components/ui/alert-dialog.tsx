import * as React from 'react';
import { View } from 'react-native';
import * as AlertDialogPrimitive from '@rn-primitives/alert-dialog';
import { cn } from '@/lib/utils';
import { TextClassContext } from '@/components/ui/text';

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ style, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    style={[{ zIndex: 50, backgroundColor: 'rgba(0,0,0,0.8)', flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }, style]}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ style, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay>
      <AlertDialogPrimitive.Content
        ref={ref}
        style={[{ zIndex: 50, maxWidth: 400, gap: 16, borderWidth: 1, borderColor: 'hsl(215, 16%, 47%)', backgroundColor: 'hsl(0, 0%, 100%)', padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, borderRadius: 16, width: '100%' }, style]}
        {...props}
      />
    </AlertDialogOverlay>
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
  style,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View style={[{ flexDirection: 'column', gap: 8, alignItems: 'center' }, style]} {...props} />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter = ({
  style,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    style={[{ flexDirection: 'column', gap: 8, marginTop: 8, alignItems: 'center' }, style]}
    {...props}
  />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ style, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    style={[{ fontSize: 18, color: 'hsl(222.2, 84%, 4.9%)', fontWeight: '600' }, style]}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ style, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    style={[{ fontSize: 14, color: 'hsl(215.4, 16.3%, 46.9%)' }, style]}
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ style, ...props }, ref) => (
  <TextClassContext.Provider value="text-primary-foreground font-medium">
    <AlertDialogPrimitive.Action
      ref={ref}
      style={[{ height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 6, backgroundColor: 'hsl(222.2, 47.4%, 11.2%)', paddingHorizontal: 16, paddingVertical: 8, marginTop: 16 } as any, style]}
      {...props}
    />
  </TextClassContext.Provider>
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ style, ...props }, ref) => (
  <TextClassContext.Provider value="text-foreground font-medium">
    <AlertDialogPrimitive.Cancel
      ref={ref}
      style={[{ height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 6, borderWidth: 1, borderColor: 'hsl(214.3, 31.8%, 91.4%)', backgroundColor: 'hsl(0, 0%, 100%)', paddingHorizontal: 16, paddingVertical: 8, marginTop: 8 } as any, style]}
      {...props}
    />
  </TextClassContext.Provider>
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
