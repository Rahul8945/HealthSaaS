export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    return undefined
  }

  try {
    return await navigator.serviceWorker.register('/service-worker.js')
  } catch (error) {
    console.error('Service worker registration failed', error)
    return undefined
  }
}

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    throw new Error('This browser does not support notifications.')
  }

  if (Notification.permission !== 'default') {
    return Notification.permission
  }

  return Notification.requestPermission()
}

export const showCareNotification = async () => {
  const registration =
    (await navigator.serviceWorker.getRegistration()) || (await registerServiceWorker())

  if (!registration) {
    throw new Error('Service worker is not available.')
  }

  await registration.showNotification('Patient follow-up due', {
    body: 'Sara Fernandes has a critical asthma review scheduled tomorrow.',
    icon: '/notification-icon.svg',
    badge: '/notification-icon.svg',
    tag: `patient-follow-up-${Date.now()}`,
    data: {
      url: '/patients',
    },
  })
}
